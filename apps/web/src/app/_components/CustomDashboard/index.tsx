"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import type { EntityToGroup, Group} from 'payload/dist/admin/utilities/groupNavItems'

import { getTranslation } from 'payload/dist/utilities/getTranslation'
import { EntityType, groupNavItems } from './groupNavItems'
import { Button, Card, Gutter } from 'payload/components/elements'
import { useConfig } from 'payload/components/utilities'

import type { Permissions, User } from 'payload/auth'
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload/types'

import './index.scss'

type Props = {
    collections: SanitizedCollectionConfig[]
    globals: SanitizedGlobalConfig[]
    permissions: Permissions
    user: User
  }

const baseClass = 'dashboard'

const Dashboard: React.FC<Props> = (props) => {
  const { collections, globals, permissions, user } = props

  const { push } = useHistory()
  const { i18n, t } = useTranslation('general')

  const {
    admin: {
      components: { afterDashboard, beforeDashboard },
    },
    routes: { admin },
  } = useConfig()

  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    setGroups(
      groupNavItems(
        [
          ...collections
            .filter(
              ({ admin: { hidden } }) =>
                !(typeof hidden === 'function' ? hidden({ user }) : hidden),
            )
            .map((collection) => {
              const entityToGroup: EntityToGroup = {
                entity: collection,
                type: EntityType.collection,
              }

              return entityToGroup
            }),
          ...globals
            .filter(
              ({ admin: { hidden } }) =>
                !(typeof hidden === 'function' ? hidden({ user }) : hidden),
            )
            .map((global) => {
              const entityToGroup: EntityToGroup = {
                entity: global,
                type: EntityType.global,
              }

              return entityToGroup
            }),
        ],
        permissions,
      ),
    )
  }, [collections, globals, permissions, user])

  return (
    <div className={baseClass}>
      <Gutter className={`${baseClass}__wrap`}>
        {Array.isArray(beforeDashboard) &&
          beforeDashboard.map((Component, i) => <Component key={i} />)}
        {groups.map(({ entities, label }, groupIndex) => {
          return (
            <div className={`${baseClass}__group`} key={groupIndex}>
              <h2 className={`${baseClass}__label`}>{label}</h2>
              <ul className={`${baseClass}__card-list`}>
                {entities.map(({ entity, type }, entityIndex) => {
                  let title: string
                  let buttonAriaLabel: string
                  let createHREF: string
                  let onClick: () => void
                  let hasCreatePermission: boolean

                  if (type === EntityType.collection) {
                    title = getTranslation(entity.labels.plural, i18n)
                    buttonAriaLabel = t('showAllLabel', { label: title })
                    onClick = () => push({ pathname: `${admin}/collections/${entity.slug}` })
                    createHREF = `${admin}/collections/${entity.slug}/create`
                    hasCreatePermission =
                      permissions?.collections?.[entity.slug]?.create?.permission
                  }

                  if (type === EntityType.global) {
                    title = getTranslation(entity.label, i18n)
                    buttonAriaLabel = t('editLabel', { label: getTranslation(entity.label, i18n) })
                    onClick = () => push({ pathname: `${admin}/globals/${entity.slug}` })
                  }

                  return (
                    <li key={entityIndex}>
                      <Card
                        actions={
                          hasCreatePermission && type === EntityType.collection ? (
                            <Button
                              aria-label={t('createNewLabel', {
                                label: getTranslation(entity.labels.singular, i18n),
                              })}
                              buttonStyle="icon-label"
                              el="link"
                              icon="plus"
                              iconStyle="with-border"
                              round
                              to={createHREF}
                            />
                          ) : undefined
                        }
                        buttonAriaLabel={buttonAriaLabel}
                        id={`card-${entity.slug}`}
                        onClick={onClick}
                        title={title}
                        titleAs="h3"
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
        {Array.isArray(afterDashboard) &&
          afterDashboard.map((Component, i) => <Component key={i} />)}
      </Gutter>
    </div>
  )
}

export default Dashboard
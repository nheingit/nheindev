'use client'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import type { EntityToGroup, Group } from 'payload/dist/admin/utilities/groupNavItems'

import { getTranslation } from 'payload/dist/utilities/getTranslation'
import { EntityType, groupNavItems } from './groupNavItems'
import { Button, Card, Gutter } from 'payload/components/elements'
import { useConfig } from 'payload/components/utilities'

import type { Permissions, User } from 'payload/auth'
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload/types'

type Props = {
  collections: SanitizedCollectionConfig[]
  globals: SanitizedGlobalConfig[]
  permissions: Permissions
  user: User
}

const Dashboard: React.FC<Props> = props => {
  const { collections, globals, permissions, user } = props

  const { push } = useHistory()

  const {
    admin: {
      components: { afterDashboard, beforeDashboard },
    },
    routes: { admin },
  } = useConfig()

  const [groups, setGroups] = useState<Group[]>([])
  // fetch data
  useEffect(() => {
    setGroups(
      groupNavItems(
        [
          ...collections
            .filter(
              ({ admin: { hidden } }) =>
                !(typeof hidden === 'function' ? hidden({ user }) : hidden),
            )
            .map(collection => {
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
            .map(global => {
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
    <div>
      <Gutter>
        {Array.isArray(beforeDashboard) &&
          beforeDashboard.map((Component, i) => <Component key={i} />)}
        {groups.map(({ entities, label }, groupIndex) => {
          return (
            <div key={groupIndex}>
              <h2>{label}</h2>
              <ul>
                {entities.map(({ entity, type }, entityIndex) => {
                  let title: string
                  let buttonAriaLabel: string
                  let createHREF: string
                  let onClick: () => void
                  let hasCreatePermission: boolean

                  if (type === EntityType.collection) {
                    title = entity?.labels?.plural as string

                    onClick = () => push({ pathname: `${admin}/collections/${entity.slug}` })
                    createHREF = `${admin}/collections/${entity.slug}/create`
                    hasCreatePermission =
                      permissions?.collections?.[entity.slug]?.create?.permission
                  }

                  if (type === EntityType.global) {
                    title = entity?.label as string
                    onClick = () => push({ pathname: `${admin}/globals/${entity.slug}` })
                  }

                  return (
                    <li key={entityIndex}>
                      <Card
                        actions={
                          hasCreatePermission && type === EntityType.collection ? (
                            <Button
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

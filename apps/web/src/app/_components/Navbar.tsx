'use client'

import * as React from 'react'
import Link from 'next/link'

// payload uses this component, and typescript is complaining about not being able to resolve it over there.
// Not sure why *shrug*
import { cn } from '../../../../../packages/ui/src/lib/utils'
import {
  NavigationMenu as NavMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@repo/ui'

export function NavigationMenu() {
  return (
    <NavMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/posts" legacyBehavior passHref>
            <NavigationMenuLink className={`hover:text-secondary ` + navigationMenuTriggerStyle()}>
              Posts
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="https://github.com/nheingit" legacyBehavior passHref>
            <NavigationMenuLink className={`hover:text-secondary ` + navigationMenuTriggerStyle()}>
              Github
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="https://twitter.com/TheNoahHein" legacyBehavior passHref>
            <NavigationMenuLink className={`hover:text-secondary ` + navigationMenuTriggerStyle()}>
              Twitter
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavMenu>
  )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'

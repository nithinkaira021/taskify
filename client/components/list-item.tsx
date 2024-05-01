import * as React from 'react';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

import ListModal from '@/components/modals/list-modal';

import type { List } from '@/types';
import { cn } from '@/lib/util/tw-merge';
import { useFilter } from '@/hooks/use-filter';

export default function ListItem({ list }: { list?: List }) {
  const { persistQueryString } = useFilter();
  const router = useRouter();
  const path = usePathname();

  if (!list) {
    return (
      <ListModal>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Icons.Add className="w-3 h-3" />
        </Button>
      </ListModal>
    );
  }

  const persistRouterPush = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`${href}?${persistQueryString()}`);
  };

  return (
    <Button
      variant="ghost"
      className={cn(
        'ml-auto flex justify-start px-2 w-full text-muted-foreground dark:text-muted-foreground dark:hover:bg-accent bg-transparent dark:bg-transparent group',
        path === `/lists/${list.id}` && 'bg-primary/20 dark:bg-primary/20',
      )}
      onClick={(e) => persistRouterPush(`/lists/${list.id}`, e)}
    >
      <div className="rounded-full bg-primary/10 p-1">
        <span className="h-4 w-4 block text-center text-xs text-foreground">
          {list.name[0]}
        </span>
      </div>
      <span className={cn('ml-2')}>{list.name}</span>
      <div
        role="presentation"
        className={cn('group-hover:block hidden ml-auto')}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ListModal list={list}>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icons.More className="w-3 h-3" />
          </Button>
        </ListModal>
      </div>
    </Button>
  );
}

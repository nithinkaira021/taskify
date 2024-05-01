'use client';

import * as React from 'react';
import toast from 'react-hot-toast';

import { FieldValues, PathValue, Path, UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/ui/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Task, TaskPriority } from '@/types';
import { TaskService } from '@/services/task-service';
import { handleError } from '@/lib/util/error';
import { cn } from '@/lib/util/tw-merge';

type Priority = { value: TaskPriority; color: string; label: string };

export const priorities: Priority[] = [
  { value: 'HIGH', color: '#EF4444', label: 'High' },
  { value: 'MEDIUM', color: '#EAB308', label: 'Medium' },
  { value: 'LOW', color: '#0EA5E9', label: 'Low' },
];

export function PriorityItem({
  priority,
  onSelect,
}: {
  priority: Priority;
  // eslint-disable-next-line no-unused-vars
  onSelect: (priority: TaskPriority) => void;
}) {
  return (
    <Button
      onClick={() => onSelect(priority.value)}
      variant="ghost"
      className="w-full justify-start px-2 h-8"
    >
      <Icons.Flag className="w-4 h-4 mr-2" style={{ color: priority.color }} />
      {priority.label}
    </Button>
  );
}

interface FormVariant<T extends FieldValues> {
  type: 'form';
  form: UseFormReturn<T>;
  register: Path<T>;
}

interface TaskVariant {
  type: 'dropdown';
  task: Task;
}

interface PriorityPickerProps<T extends FieldValues> {
  variant: FormVariant<T> | TaskVariant;
  defaultValue?: TaskPriority | null;
  small?: boolean;
}

export function PriorityPicker<T extends FieldValues>({
  variant,
  defaultValue,
  // eslint-disable-next-line no-unused-vars
  small = false,
}: PriorityPickerProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  const [, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSelect = async (priority: TaskPriority) => {
    setOpen(false);
    setValue(priority);

    if ('form' in variant) {
      const { form, register } = variant as FormVariant<T>;
      form.setValue(register, priority as PathValue<T, Path<T>>);
    }

    if ('task' in variant) {
      const { task } = variant as TaskVariant;
      setIsLoading(true);
      try {
        await TaskService.updateTask(task.id, { ...task, priority });
        toast.success('Changes saved.');
        router.refresh();
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const removePriority = async (task: Task) => {
    setIsLoading(true);
    try {
      await TaskService.updateTask(task.id, { ...task, priority: null });
      toast.success('Priority removed.');
      router.refresh();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRemove = async () => {
    setOpen(false);
    setValue(undefined);

    if ('form' in variant) {
      const { form, register } = variant as FormVariant<T>;
      form.unregister(register);
    }

    if ('task' in variant) {
      const { task } = variant as TaskVariant;
      await removePriority(task);
    }
  };

  const priority = priorities.find((p) => p.value === value);

  if ('task' in variant) {
    return (
      <div>
        {priorities.map((priority) => (
          <Button
            key={priority.value}
            size="sm"
            variant={value === priority.value ? 'secondary' : 'ghost'}
            onClick={() => onSelect(priority.value)}
          >
            <Icons.Flag className="w-4 h-4" style={{ color: priority.color }} />
          </Button>
        ))}
        <Button
          size="sm"
          variant={value ? 'ghost' : 'secondary'}
          onClick={onRemove}
        >
          <Icons.Flag className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger
        aria-expanded={open}
        className={cn(buttonVariants({ variant: 'outline' }), 'w-fit gap-2')}
      >
        <Icons.Flag className="w-4 h-4" style={{ color: priority?.color }} />
        {value && (
          <span className="flex-gap">
            {value}
            <Icons.Close className="w-4 h-4" onClick={onRemove} />
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1">
        {priorities.map((priority) => (
          <PriorityItem
            key={priority.value}
            priority={priority}
            onSelect={onSelect}
          />
        ))}
        <Button
          onClick={onRemove}
          variant="ghost"
          className="w-full justify-start px-2 h-8"
        >
          <Icons.Flag className="w-4 h-4 mr-2" />
          None
        </Button>
      </PopoverContent>
    </Popover>
  );
}

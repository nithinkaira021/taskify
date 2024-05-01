import React from 'react';

import { MentionsInput as ReactMentionInput, Mention } from 'react-mentions';
import { FieldValues, PathValue, Path, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/util/tw-merge';
import { inputStyle } from '@/styles/styles';
import type { List, Label, Task } from '@/types';
import {
  extractName,
  extractLabelIds,
  extractListId,
  formatMentionInput,
} from '@/lib/util/mention-processor';

interface MentionInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  register: Path<T>;
  task?: Task;
  lists: List[];
  labels: Label[];
  defaultValue?: string;
  small?: boolean;
  preview?: boolean;
}

export default function MentionInput<T extends FieldValues>({
  form,
  task,
  register,
  lists,
  labels,
  defaultValue,
  preview,
  small = false,
  ...props
}: MentionInputProps<T>) {
  const name = form.getValues('name' as Path<T>);
  const listId = form.getValues('listId' as Path<T>);
  const labelIds = form.getValues('labelIds' as Path<T>);

  const [input, setInput] = React.useState(
    formatMentionInput({ name, labelIds, listId, labels, lists }),
  );

  const formattedLists = listId
    ? []
    : lists.map((list) => ({
        id: list.id,
        display: list.name,
      }));

  const formattedLabels = labels
    .filter((label) => !labelIds?.includes(label.id))
    .map((label) => ({
      id: label.id,
      display: label.name,
    }));

  const onChange = (e: { target: { value: string } }) => {
    setInput(e.target.value);
    form.setValue(
      'name' as Path<T>,
      extractName(e.target.value) as PathValue<T, Path<T>>,
    );
    form.setValue(
      'listId' as Path<T>,
      extractListId(e.target.value) as PathValue<T, Path<T>>,
    );
    form.setValue(
      'labelIds' as Path<T>,
      extractLabelIds(e.target.value) as PathValue<T, Path<T>>,
    );
  };

  return (
    <ReactMentionInput
      value={input}
      onChange={(e) => onChange(e)}
      style={{ ...inputStyle }}
      className={cn('w-full font-semibold', small ? 'text-sm' : 'text-lg')}
      placeholder={preview ? 'Experiment with @ or # mentions...' : 'Task Name'}
      spellCheck={false}
      autoComplete="off"
      {...props}
    >
      <Mention
        markup="@[__display__](at:__id__)"
        trigger="@"
        data={formattedLists}
        className="bg-emerald-200 dark:bg-emerald-700"
      />
      <Mention
        markup="@[__display__](hash:__id__)"
        trigger="#"
        data={formattedLabels}
        className="bg-sky-200 dark:bg-sky-700"
      />
      <Mention
        markup="@[__display__](cmd:__id__)"
        trigger="/"
        data={formattedLists}
        className="bg-sky-200 dark:bg-sky-700"
      />
    </ReactMentionInput>
  );
}

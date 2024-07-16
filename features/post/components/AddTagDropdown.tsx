'use client';

import { Button, type ButtonProps } from '@nextui-org/button';
import { DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, type DropdownProps } from '@nextui-org/dropdown';
import { Plus } from 'lucide-react';
import { useServerAction } from 'zsa-react';

import { addPostTag } from '@/features/post/actions/addPostTag';
import { TagItem } from '@/features/tag/components/TagItem';
import { usePostTags } from '@/features/tag/hooks/usePostTags';

interface IProps extends Omit<DropdownProps, 'children'> {
  postId: number;
  skipTags?: number[];
  buttonProps?: ButtonProps;
}

export const AddTagDropdown: RC<IProps> = ({ skipTags, postId, buttonProps, ...props }) => {
  const { isPending, execute } = useServerAction(addPostTag);
  const { tags, isFetchingTags } = usePostTags();

  const filteredTags = tags.filter((tag) => !skipTags?.includes(tag.id));

  const handleAddTag = (tagId: number) => {
    if (!tagId) return;
    execute({ postId: postId, tagId });
  };

  if (isFetchingTags) return <Button isIconOnly isLoading size="sm" />;

  if (!filteredTags.length) return null;

  return (
    <Dropdown
      showArrow
      classNames={{
        base: 'before:bg-default-200', // change arrow background
        content:
          'py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black',
      }}
      size="md"
      {...props}
    >
      <DropdownTrigger>
        <Button isIconOnly isLoading={isPending} size="sm" variant="light" {...buttonProps}>
          <Plus size="1.8cap" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Select tags" onAction={(key) => handleAddTag(Number(key))}>
        {filteredTags.map((tag) => (
          <DropdownItem key={tag.id}>
            <TagItem size="lg" tag={tag} variant="plain" />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

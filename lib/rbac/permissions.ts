/**
 * Role-Based Access Control (RBAC)
 *
 * Roles:
 *   1 = admin (full access)
 *   2 = moderator (can delete posts/tags)
 *   3 = member (can create/edit own posts)
 */

export enum RoleId {
  ADMIN = 1,
  MODERATOR = 2,
  MEMBER = 3,
}

export type Permission =
  | 'post:create'
  | 'post:edit'
  | 'post:delete'
  | 'tag:create'
  | 'tag:delete'
  | 'note:create'
  | 'note:delete';

// Permissions by role
const ROLE_PERMISSIONS: Record<RoleId, Permission[]> = {
  [RoleId.ADMIN]: ['post:create', 'post:edit', 'post:delete', 'tag:create', 'tag:delete', 'note:create', 'note:delete'],
  [RoleId.MODERATOR]: [
    'post:create',
    'post:edit',
    'post:delete',
    'tag:create',
    'tag:delete',
    'note:create',
    'note:delete',
  ],
  [RoleId.MEMBER]: ['post:create', 'post:edit', 'note:create', 'note:delete'],
};

/**
 * Check if a role has a specific permission
 */
export const hasPermission = (roleId: RoleId | undefined | null, permission: Permission): boolean => {
  if (!roleId) return false;
  return ROLE_PERMISSIONS[roleId]?.includes(permission) ?? false;
};

/**
 * Check if user can delete content (admin or moderator)
 */
export const canDelete = (roleId: RoleId | undefined | null): boolean => {
  if (!roleId) return false;
  return roleId === RoleId.ADMIN || roleId === RoleId.MODERATOR;
};

/**
 * Check if user is admin
 */
export const isAdmin = (roleId: RoleId | undefined | null): boolean => {
  return roleId === RoleId.ADMIN;
};

/**
 * Check if user is moderator or higher
 */
export const isModerator = (roleId: RoleId | undefined | null): boolean => {
  return roleId === RoleId.ADMIN || roleId === RoleId.MODERATOR;
};

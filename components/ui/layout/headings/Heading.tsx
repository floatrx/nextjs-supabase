import { title, type TTitleVariant } from '@/components/primitives';
import { cn } from '@/lib/utils/cn';

interface IProps {
  variant?: TTitleVariant;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export const Heading: FC<IProps> = ({ tag: Tag = 'h1', variant, className, ...props }) => (
  <Tag className={cn(className, title(variant))} {...props} />
);

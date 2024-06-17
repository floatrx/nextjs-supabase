import { Spinner, SpinnerProps } from '@nextui-org/spinner';

export interface LoaderProps extends SpinnerProps {
  loading?: boolean;
}

/**
 * Spinner loader (wrapper) component with loading condition
 * @param loading - loading condition (boolean)
 * @param props - all compatible nextui SpinnerProps
 * @constructor
 */
export const Loader: RC<LoaderProps> = ({ loading, ...props }) => {
  if (!loading) return null;

  return <Spinner {...props} />;
};

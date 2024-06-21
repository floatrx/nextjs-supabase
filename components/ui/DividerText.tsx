interface IProps {
  text: string;
}

export const DividerText: FC<IProps> = ({ text, children }) => (
  <div className="relative flex items-center py-2">
    <div className="flex-grow border-t" />
    <span className="mx-4 flex-shrink text-gray-400">{text || children}</span>
    <div className="flex-grow border-t" />
  </div>
);

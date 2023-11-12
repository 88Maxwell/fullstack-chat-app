export interface TabProps {
  className?: string;
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
}

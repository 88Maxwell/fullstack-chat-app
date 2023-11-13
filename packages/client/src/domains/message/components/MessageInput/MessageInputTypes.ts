export interface MessageInputProps {
  className?: string;
  value: string;
  onKeyDown: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

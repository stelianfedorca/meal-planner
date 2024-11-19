import { Gender } from '@/types/Gender';
import styles from './DropdownMenu.module.scss';

type Props = {
  option: Gender;
  onOptionSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};
export function DropdownMenu({ option, onOptionSelect }: Props) {
  return (
    <select
      value={option}
      onChange={onOptionSelect}
      className={styles.container}
    >
      <option value={0}>Male</option>
      <option value={1}>Female</option>
    </select>
  );
}

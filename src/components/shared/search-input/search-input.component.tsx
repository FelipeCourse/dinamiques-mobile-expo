import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import { useArticleContext } from '@/contexts';

import { InputComponent } from '../input/input.component';
import { s } from './search-input.style';

type SearchInputComponentProps = {
  placeholder?: string;
};

export function SearchInputComponent({
  placeholder = 'Buscar por título ou conteúdo',
}: SearchInputComponentProps): JSX.Element {
  const { searchQuery, handleArticlesFilter } = useArticleContext();

  return (
    <InputComponent>
      <InputComponent.Field
        style={s.searchInputField}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={(value) => handleArticlesFilter(value)}
      >
        <MagnifyingGlassIcon style={s.searchInputIcon} />
      </InputComponent.Field>
    </InputComponent>
  );
}

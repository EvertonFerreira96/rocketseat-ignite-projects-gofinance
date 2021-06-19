import React from 'react';
import { FlatList } from 'react-native';
import Button from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import { 
    Category,
    Container,
    Footer,
    Icon,
    Name,
    Header,
    Title,
    Separator
} from './styles';


interface Category {
    key: string;
    name: string;
}
interface CategorySelect {
    category: Category;
    setCategory: (category: Category) => void;  
    closeSelectCategory: () => void;
}

const CategorySelect: React.FC<CategorySelect> = ({category, setCategory, closeSelectCategory}) => {
  function handleCategorySelect(item: Category) { 
    setCategory(item)
  }
  return (
      <Container>
          <Header>
              <Title>Category</Title>
          </Header>
          <FlatList
            data={categories}
            style={{ flex:1, width: '100%' }}
            keyExtractor={(item) => item.key }
            renderItem={({ item : {name, key, icon, color} }) => (
                <Category 
                    onPress={() => handleCategorySelect({key, name})}
                    isActive={key === category.key}
                    >
                    <Icon name={icon} color={color} />
                    <Name>
                        {name}
                    </Name>
                </Category>
            )}
            ItemSeparatorComponent={() => <Separator />}
           />
        <Footer>
            <Button title="Selecionar" onPress={() => closeSelectCategory()}/>
        </Footer>
      </Container>
  );
}

export default CategorySelect;
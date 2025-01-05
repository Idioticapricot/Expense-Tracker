import { useState } from "react";
import styles from './ListGroup.module.css'
import styled from "styled-components";
const List = styled.ul`
    list-style: none;
    padding: 0;
`
const List1 = styled.li<ListItemProps>`
padding; 5px 0;
background: ${props => props.active ? 'blue':"none"}

`
interface ListItemProps{
  active: boolean;
}
interface props {
  items: string[];
  heading: string;
  onSelectItem : (items: string) => void;
}
function ListGroup({ items, heading, onSelectItem }: props) {
  const [selected, setSelected] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>
      
      {items.length === 0 && <p>No items found</p>}
      <List>
        {items.map((items, index) => (
          <List1
          active={index === selected}
            
            key={items}
            onClick={() => {
              setSelected(index);
              onSelectItem(items);
            }}
          >
            {items}
          </List1>
        ))}
      </List>
      
    </>
  );
}
export default ListGroup;

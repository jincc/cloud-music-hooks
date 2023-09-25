import styled from "styled-components";
import style from '../../styles/global';

const ListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ListItem = styled.li`
  padding: 6px 12px;
  font-size: ${style["font-size-s"]};
  line-height: 1.3;
  color: ${style.grey};
`;

const SongList = ({songs}) => {
  const elements = songs.map((e, index) => {
    return (
      <ListItem key={e.id + `${index}`}>
        {`${index+1}. ${e.first} - ${e.second}`}
      </ListItem>
    )
  })
  return <ListWrapper>
    <ul>
      {elements}
    </ul>
  </ListWrapper>
};

export default SongList;
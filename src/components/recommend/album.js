import style from '../../styles/global'
import styled from 'styled-components';
import { formatPlayCount } from '../../utils';
/**
 * {
  "id": 2075587022,
  "type": 0,
  "name": "助眠辑 | 自然音，伴灵动乐符萦绕耳畔",
  "copywriter": "",
  "picUrl": "https://p1.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg",
  "canDislike": true,
  "trackNumberUpdateTime": 1533916733093,
  "playCount": 29223774,
  "trackCount": 104,
  "highQuality": true,
  "alg": "alg_high_quality"
}
 * @returns 
 */
const Container = styled.div`
  margin-bottom: 15px;
  position: relative;
  width: 32vw;
  .cover {
    height: 32vw;
    border-radius: 3px;
  }
  .title {
    margin-top: 2px;
    font-size: ${style['font-size-m']};
    color: ${style['font-color-desc']}
  }

  .top-shade {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25px;
    padding-right: 5px;
    font-size: ${style["font-size-s"]};
    color: #fff;
  }

  .decorate {
    position: absolute;
    left: 0;
    width: 100%;
    top: 0;
    height: 25px;
    ${style.decorateBackground()}
  }
`;

const AlbumCard = ({album, onClick}) => {
  // isBigMode用来区分卡片的大小模式
  const {playCount, picUrl, name} = album;
  return <Container onClick={onClick}>
    <img src={picUrl + "?param=300*200"} alt="rank_card" className="cover"/>
    <div className='title'>{name}</div>

    <div className="decorate"></div>
    <span className="top-shade">
      <span className='iconfont'>&#xe885;</span>
      <span>{formatPlayCount(playCount)}</span>
    </span>
  </Container>
};

export default AlbumCard;
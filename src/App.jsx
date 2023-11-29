import React, { useState } from "react";
import GlobalStyle from "./components/GlobalStyle";
import Router from "./shared/Router";
import { Reset } from "styled-reset";
import uuid from "react-uuid";

function App() {
  const [cardList, setCardList] = useState([
    {
      createdat: "2023-11-16T12:00:00Z",
      nickname: "토르팬",
      avatar: "https://i.imgur.com/45678901.png",
      content:
        "토르 파이팅!토르는 아스가르드의 왕자이자 어벤져스의 일원으로, 강력한 힘과 용기로 우주를 지키는 영웅입니다. 그는 압도적인 힘과 무기인 묠니르를 사용하여 적을 물리치며, 정의와 평화를 위해 끊임없이 노력합니다. 토르는 다가오는 어벤져스 영화에서 더욱 강력한 모습으로 돌아올 것으로 기대됩니다. 그는 신화 속의 영웅답게, 우주의 위협에 맞서 싸우며 진정한 영웅으로 거듭날 것입니다. 토르의 활약을 응원합니다!",
      id: uuid(),
      writedto: "토르",
    },
    {
      createdat: "2023-11-16T12:01:00Z",
      nickname: "닥터스트레인지팬",
      avatar: "https://i.imgur.com/89012345.png",
      content: "닥터스트레인지 파이팅! 마법의 힘으로 지구를 구해줘!",
      id: uuid(),
      writedto: "닥터스트레인지",
    },
    {
      createdat: "2023-11-16T12:02:00Z",
      nickname: "캡틴아메리카팬",
      avatar: "https://i.imgur.com/67890123.png",
      content:
        "캡틴 아메리카는 2차 세계대전 당시 히드라에 맞서 싸운 영웅으로, 자유와 평화를 상징하는 아이콘입니다. 그는 뛰어난 체력과 전투 기술, 그리고 정의로운 성품으로 세계를 구하는 데 앞장섰습니다. 캡틴 아메리카는 어벤져스의 창립 멤버이자 리더로서, 어벤져스의 승리에 기여했습니다. 그는 항상 정의와 평화를 위해 싸웠으며, 모든 사람들의 존엄성을 존중하는 진정한 영웅입니다. 캡틴 아메리카는 2019년 개봉한 영화 <어벤져스: 엔드게임>에서 타노스와의 전투에서 목숨을 잃었지만, 그의 희생은 결코 잊혀지지 않을 것입니다. 캡틴 아메리카의 활약을 응원합니다!",
      id: uuid(),
      writedto: "캡틴아메리카",
    },
    {
      createdat: "2023-11-16T12:03:00Z",
      nickname: "블랙위도우팬",
      avatar: "https://i.imgur.com/23456789.png",
      content:
        "블랙 위도우는 냉혹한 스파이에서 어벤져스의 핵심 멤버로 거듭난, 강인하고 지혜로운 여전사입니다. 그녀는 자신의 과거를 딛고 일어나, 세계를 위협하는 적에 맞서 싸우며 정의와 평화를 위해 헌신했습니다. 블랙 위도우는 2021년 개봉한 영화 <블랙 위도우>에서 자신의 과거와 가족에 대한 진실을 마주하고, 진정한 자신의 모습을 찾아가는 여정을 보여줬습니다. 그녀는 자신의 과거를 받아들이고, 새로운 삶을 시작하며 진정한 영웅으로 거듭났습니다. 블랙 위도우는 어벤져스에서 없어서는 안 될 존재였습니다. 그녀는 뛰어난 전투 기술과 지능, 그리고 강한 정신력으로 어벤져스의 승리에 기여했습니다. 그녀의 희생은 결코 잊혀지지 않을 것입니다. 블랙 위도우의 활약을 응원합니다!",
      id: uuid(),
      writedto: "블랙위도우",
    },
    {
      createdat: "2023-11-16T12:04:00Z",
      nickname: "블랙위도우팬",
      avatar: "https://i.imgur.com/01234567.png",
      content: "블랙위도우 파이팅! 지구의 수호자, 악당들을 물리쳐라!",
      id: uuid(),
      writedto: "블랙위도우",
    },

    {
      createdat: "2023-11-16T12:05:00Z",
      nickname: "토르팬",
      avatar: "https://i.imgur.com/45678901.png",
      content:
        "토르는 아스가르드의 왕자이자, 압도적인 힘과 용기로 우주를 지키는 영웅입니다. 그는 묠니르라는 강력한 망치를 사용하여 적을 물리치며, 정의와 평화를 위해 끊임없이 노력합니다. 토르는 어벤져스의 일원으로, 어벤져스의 승리에 기여했습니다. 그는 강력한 힘과 용기로 적들을 물리쳤으며, 어벤져스의 든든한 동반자였습니다. 토르는 2022년 개봉한 영화 <토르: 러브 앤 썬더>에서 새로운 모습을 보여줬습니다. 그는 자신의 과거를 극복하고, 새로운 삶을 시작하며 진정한 영웅으로 거듭났습니다. 토르의 활약을 응원합니다!",
      id: uuid(),
      writedto: "토르",
    },
    {
      createdat: "2023-11-16T12:06:00Z",
      nickname: "닥터스트레인지팬",
      avatar: "https://i.imgur.com/89012345.png",
      content:
        "닥터 스트레인지는 뛰어난 지성과 신비한 힘을 가진 마법사입니다. 그는 어벤져스의 일원으로, 지혜와 마법의 힘을 사용하여 세계를 구하는 데 도움을 줍니다. 닥터 스트레인지는 다가오는 어벤져스 영화에서 더욱 강력한 마법의 힘을 보여줄 것으로 기대됩니다. 그는 적의 공격을 막고, 아군을 보호하며, 새로운 능력을 개발하며 어벤져스에서 없어서는 안 될 존재로 자리매김할 것입니다. 닥터 스트레인지의 활약을 응원합니다!",
      id: uuid(),
      writedto: "닥터스트레인지",
    },
    {
      createdat: "2023-11-16T12:07:00Z",
      nickname: "캡틴아메리카팬",
      avatar: "https://i.imgur.com/67890123.png",
      content: "캡틴아메리카, 정의의 수호자로 악당들을 물리쳐라!",
      id: uuid(),
      writedto: "캡틴아메리카",
    },
  ]);

  return (
    <div>
      <div></div>
      <Reset />
      {/* <Header />
      <Form />
      <CardList /> */}
      <Router cardList={cardList} setCardList={setCardList} />
      <GlobalStyle />
    </div>
  );
}

export default App;

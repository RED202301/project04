export const tourOptions = {
    nextLabel: "다음",
    prevLabel: "이전",
    doneLabel: "끝",
    disableInteraction: true,
    buttonClass: "text-black p-2 m-1",
  };
  
  export const tourSteps = [
    {
      title: "공유 버튼",
      element: "#share",
      intro:
        "내 페이지를 <b>공유</b> 해보세요.",
    },
    {
      title: "목록 버튼",
      element: "#floating-button",
      intro:
        `클릭 시 목록이 열립니다.
        <br>
         '꾹 클릭' 시 목록 버튼을 <br> 이동시킬 수 있습니다.`,
      position: "top"
    },
    {
      title: "목록-메세지 작성",
      element: "#ID0",
      intro: "클릭 시 메세지를 <br> 작성할 수 있습니다.",
      position: "top"
    },
    {
      title: "목록-메세지 모아보기",
      element: "#ID1",
      intro: "클릭 시 메세지를 <br> 모아볼 수 있습니다.",
      position: "top"
    },
    {
      title: "목록-홈",
      element: "#ID2",
      intro: "클릭 시 페이지로 <br> 이동할 수 있습니다.",
      position: "top"
    },
    {
      title: "목록-비밀편지 모아보기",
      element: "#ID3",
      intro: "클릭 시 비밀편지를 <br> 모아볼 수 있습니다.",
      position: "top-left-aligned"
    },
    {
      title: "메세지",
      element: "#message",
      intro: "클릭 시 메세지를 <br> 확대해서 볼 수 있습니다. <br> 꾹 누르면 메세지를 <br> 자유롭게 배치할 수 있습니다.",
    },
  ];
  
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      // cumulative layout shift 시각적 안정성 (요소들이 클릭하기 전에 위치가 변경되던가 하는 것 안됨)
      getFID(onPerfEntry);
      // first input delay 상호 작용력 (사용자가 페이지와 처음 상호작용한 시간부터 실제로 이벤트를 시작할 수 있는 시간까지)
      getFCP(onPerfEntry);
      // first contentful paint 첫 컨텐츠가 렌더링되는 시간
      getLCP(onPerfEntry);
      // largest contentful paint 로딩 성능 (가장 용량이 큰::중요한 요소가 표시되는 시점)
      getTTFB(onPerfEntry);
      // Time To First Byte Waiting(TTFB) (페이지 요청 시 서버에서 데이터의 첫 바이트가 도착하는 시점)
    });
  }
};

export default reportWebVitals;



const setCookie = (key, value, exp=3) => {
  const later = new Date();
  later.setDate(later.getDate()+exp);

  document.cookie = `${key}=${value}; expires=${later.toUTCString()}; path=/`;
};

const getCookie = (key) => {
  const cookieString = `;${document.cookie}`;
  const searchString = cookieString.split(`;${key}=`);
  if (searchString.length === 2) {
    return searchString.pop().split(";").shift();
  }
};

const deleteCookie = (key) => {
  document.cookie = `${key}=; expires=${new Date().toUTCString()};`;
};

export { setCookie, getCookie, deleteCookie }
export const deslugify = (slug: string | undefined) => {
  const slugArr = slug?.split('-') || [];
  let resArr = [];

  for (let x = 0; x < slugArr?.length; x++) {
    const fName1 = slug?.split('-')[x].charAt(0).toUpperCase();
    const fName2 = slug?.split('-')[x].slice(1);
    resArr.push(`${fName1}${fName2}`);
  }
  return resArr.join(' ');
};

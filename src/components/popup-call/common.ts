export const getServerFomatPhone = (phone:string):string => {
  const formatedPhone = phone.replace(/[()-]+/g,'').replace(/^8/,'+7').replace(/\s+/g, '');
  return formatedPhone;
};

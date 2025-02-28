type ItemRatingType ={
  id:string;
  url:string;
}
export const getItemsWithRandomId = (items:ItemRatingType[]):ItemRatingType[]=>{

  const ItemsWthId = items.map((item)=>({...item, id:self.crypto.randomUUID()}));
  return ItemsWthId;
};

export const createStars = (starsCount:number, url:string):ItemRatingType[]=>{
  const stars = new Array(starsCount).fill({ id: '',
    url: url}) as [ItemRatingType];
  const starsWithId = getItemsWithRandomId(stars);
  return starsWithId;
};

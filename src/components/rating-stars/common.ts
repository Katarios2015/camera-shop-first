type ItemRatingType ={
  id:string;
  url:string;
}
export const getItemsWithRandomId = (items:ItemRatingType[]):ItemRatingType[]=>{

  const ItemsWthId = items.map((item)=>({...item, id:self.crypto.randomUUID()}));
  return ItemsWthId;
};

export const STARS_COUNT = 5;
export const enum StarIconUrl {
  IconStar = '#icon-star',
  IconFullStar = '#icon-full-star'
}

export const createStars = (starsCount:number, url:string):ItemRatingType[]=>{
  const stars = new Array(starsCount).fill({ id: '',
    url: url}) as [ItemRatingType];
  const starsWithId = getItemsWithRandomId(stars);
  return starsWithId;
};

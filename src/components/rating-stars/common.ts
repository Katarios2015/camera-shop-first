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

const getRatingStarItem = (url:string)=>({ id: '',
  url: url});

export const createStars = (rating:number):ItemRatingType[]=>{
  const stars = [];
  for(let i = 0; i < STARS_COUNT; i++){
    stars.push(getRatingStarItem(StarIconUrl.IconStar));
  }
  stars.fill(getRatingStarItem(StarIconUrl.IconFullStar),0,rating);

  const starsWithId = getItemsWithRandomId(stars);
  return starsWithId;

};

export const CATEGORY_RADIO_INPUTS = [
  {
    label:'Фотокамера',
    name: 'category',
    defaultValue:'photocamera'
  },
  {
    label:'Видеокамера',
    name: 'category',
    defaultValue:'videocamera'
  }
];

export const LEVEL_CHECKBOX_INPUTS = [
  {
    label:'Нулевой',
    name: 'zero',
  },
  {
    label:'Любительский',
    name: 'non-professional',
  },
  {
    label:'Профессиональный',
    name: 'professional',
  }
];


export const TYPE_CHECKBOX_INPUTS = [
  {
    label:'Цифровая',
    name: 'digital',
  },
  {
    label:'Плёночная',
    name: 'film',
  },
  {
    label:'Моментальная',
    name: 'snapshot',
  },
  {
    label:'Коллекционная',
    name: 'collection',
  }
];

export enum FilterParamsValues {
  CategoryPhoto = 'photocamera',
  CategoryVideo = 'videocamera',
  TypeDigital = 'digital',
  TypeFilm = 'film',
  TypeSnapshot = 'snapshot',
  TypeCollection = 'collection',
  LevelZero = 'zero',
  LevelNonProfessional = 'non-professional',
  LevelProfessional = 'professional'
}

export enum FilterParamsKeys {
  Type = 'type',
  Level = 'level',
  Category = 'category',
  MaximumPrice = 'maximum-price',
  MinimumPrice = 'minimum-price',
  Page = 'page'
}

export enum CirilicFilters {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный',
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
}

export enum CirilicPageTabs {
  Description = 'Описание',
  Property = 'Характеристики'
}
enum PageTabs {
  Description = 'description',
  Property = 'property'
}

export const getCirilicParamValue = (value: string)=>{
  switch (value) {
    case FilterParamsValues.TypeDigital:
      return CirilicFilters.Digital;
    case FilterParamsValues.TypeFilm:
      return CirilicFilters.Film;
    case FilterParamsValues.TypeSnapshot:
      return CirilicFilters.Snapshot;
    case FilterParamsValues.TypeCollection:
      return CirilicFilters.Collection;
    case FilterParamsValues.LevelZero:
      return CirilicFilters.Zero;
    case FilterParamsValues.LevelNonProfessional:
      return CirilicFilters.NonProfessional;
    case FilterParamsValues.LevelProfessional:
      return CirilicFilters.Professional;
    case FilterParamsValues.CategoryPhoto:
      return CirilicFilters.Photocamera;
    case FilterParamsValues.CategoryVideo:
      return CirilicFilters.Videocamera;
    case PageTabs.Description:
      return CirilicPageTabs.Description;
    case PageTabs.Property:
      return CirilicPageTabs.Property;
    default:
      throw new Error(`Unknown checkbox value: ${value}`);
  }
};

export const getParamKey = (value: string): FilterParamsKeys => {
  switch (value) {
    case CirilicFilters.Digital:
      return FilterParamsKeys.Type;
    case CirilicFilters.Film:
      return FilterParamsKeys.Type;
    case CirilicFilters.Snapshot:
      return FilterParamsKeys.Type;
    case CirilicFilters.Collection:
      return FilterParamsKeys.Type;
    case CirilicFilters.Zero:
      return FilterParamsKeys.Level;
    case CirilicFilters.NonProfessional:
      return FilterParamsKeys.Level;
    case CirilicFilters.Professional:
      return FilterParamsKeys.Level;
    case CirilicFilters.Photocamera:
      return FilterParamsKeys.Category;
    case CirilicFilters.Videocamera:
      return FilterParamsKeys.Category;
    default:
      throw new Error(`Unknown checkbox value: ${value}`);
  }
};

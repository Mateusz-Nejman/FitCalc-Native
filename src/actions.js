export const setPage = page => ({
    type: "SET_PAGE",
    page: page
  });
  
  export const setBmr = (bmr, localSave) => ({
    type: "SET_BMR",
    bmr: bmr,
    localSave: localSave
  });

  export const setMass = (mass, localSave) => ({
    type: "SET_MASS",
    mass: mass,
    localSave: localSave
  });
  
  export const addProgress = (date, mass, localSave) => ({
    type: "ADD_PROGRESS",
    date: date,
    mass: mass,
    localSave: localSave
  });
  
  export const addProduct = (
    name,
    protein,
    carbo,
    fat,
    portion,
    hash,
    localSave
  ) => ({
    type: "ADD_PRODUCT",
    name: name,
    protein: protein,
    carbo: carbo,
    fat: fat,
    portion: portion,
    hash: hash,
    localSave: localSave
  });
  
  export const addProducts = () => ({
    type: "ADD_PRODUCTS",
  });
  
  export const addProductId = product => ({
    type: "ADD_PRODUCT_ID",
    product: product
  });
  
  export const addHistory = (date, kcal, localSave) => ({
    type: "ADD_HISTORY",
    date: date,
    kcal: kcal,
    localSave: localSave
  });
  
  export const setToday = (protein, carbo, fat, date, localSave) => ({
    type: "SET_TODAY",
    protein: protein,
    carbo: carbo,
    fat: fat,
    date: date,
    localSave: localSave
  });
  
  export const addToday = (protein, carbo, fat) => ({
    type: "ADD_TODAY",
    protein: protein,
    carbo: carbo,
    fat: fat
  });
  
  export const initUserData = () => ({
    type: "INIT"
  })
  
  export const setBlockMenu = block => ({
    type: "BLOCK_MENU",
    block: block
  })
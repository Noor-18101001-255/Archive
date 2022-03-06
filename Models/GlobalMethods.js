import Constants from "./Constants";

class GlobalMethods  {
  constructor(){}
  static async fetchUseById(id) {

    let option = {
      method: 'POST',
      body: `\"${id}\"`,
      // body: `\"18875a4d-91fd-4b6c-a11b-343dd689f084\"`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer e3fff09e-576b-4a08-8529-e88efd8eb5d5'
      }
    };

    let res = await fetch(Constants.GetUserById, option)
    // let data = await res.json();
    // console.log(data);
    return(await res.json());
  }

  static async GetAllCats( ){
    let option = {
      method: 'Get',

      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Bearer e3fff09e-576b-4a08-8529-e88efd8eb5d5'
      // }
    };

    let res = await fetch(Constants.GetallCatagory, option)
    // let data = await res.json();
    // console.log(data);
    return(await res.json());
  }

  static async GetProductsByCatagory(id){
    // console.log(id);
    let option = {
      method: 'POST',
      body: `\"${id}\"`,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer e3fff09e-576b-4a08-8529-e88efd8eb5d5'
      }
    };

    let res = await fetch(Constants.ProductByCatagory, option)
    // let data = await res.json();
    // console.log(data);
    return(await res.json());
  }

  static async fetchProductById(id) {

    let option = {
      method: 'POST',
      body: `\"${id}\"`,
      // body: `\"18875a4d-91fd-4b6c-a11b-343dd689f084\"`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer e3fff09e-576b-4a08-8529-e88efd8eb5d5'
      }
    };

    let res = await fetch(Constants.GetProductById, option)
    // let data = await res.json();
    // console.log(data);
    return(await res.json());
  }


  static async GetRecommendedProducts(userId,productId){
    console.log(userId);
    let option = {
      method: 'POST',
      body: `\"${userId}\"`,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer e3fff09e-576b-4a08-8529-e88efd8eb5d5'
      }
    };

    let res = await fetch(Constants.GetRecommendedProducts+productId, option)
    // let data = await res.json();
    // console.log(data);
    return(await res.json());
  }
}

export default GlobalMethods;
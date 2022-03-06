

const baseUrl= "http://fbdm.somee.com";
// const baseUrl= "https://localhost:44330";

const Constants =  {

  // User ApiAddress
  userId:"18875a4d-91fd-4b6c-a11b-343dd689f084",
  Login:baseUrl+"/User/Login",
  SignUp:baseUrl+"/User/SignUp",
  UsernameAvailability:baseUrl+"/User/UsernameCheck",
  GetUserById:baseUrl+"/User/GetUserById",
  EditUserBio:baseUrl+"/User/EditBio",
  
  // Product ApiAddress
  GetallCatagory:baseUrl+"/Product/GetAllCats",
  addProduct:baseUrl+"/Product/AddProduct",
  ProductByCatagory:baseUrl+"/Product/AllProductByCatagory",
  GetProductById:baseUrl+"/Product/GetProductById",
  GetRecommendedProducts:baseUrl+"/Product/GetRecommendedProducts/",

}

export default Constants;
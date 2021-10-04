class Utils {
  static normScripture(scriptToNorm){
    // console.log(scriptToNorm)
    return (scriptToNorm.toLowerCase()).normalize("NFD").replace(/\p{Diacritic}/gu, "")
  }
}
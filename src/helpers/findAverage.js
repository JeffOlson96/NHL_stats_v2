export default function findAverage(arr) {
    //console.log("arr: ", arr);
    var total = 0;
    var avg;
    if (arr.length) {
      arr.forEach((val) => {
        if (val.value) {
          total += val.value
        }
        else if (val.G) {
          total += Number(val.G)
        }
      });
      avg = total / arr.length;
    }
    return avg;
}
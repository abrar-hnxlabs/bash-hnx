package main
import (
  "fmt"
  // "github.com/golang-collections/collections/stack"
)

func fibonacci(n int) int {
	if(n <= 1){
    return 1;
  }

  return fibonacci(n-1) + fibonacci(n-2);
}

// 1 1 2 3 5 8 13
func iterativeFibb(n int) int {
  f1 := 0;
  f2 := 1;
  var fibb int;
  if( n == 0) {
    return 1;
  }
  for i := 0; i<n; i++ {
    fibb = f1 + f2
    f1 = f2
    f2 = fibb
  }
  return fibb;
}

func main(){
   var number int;
  fmt.Println("Enter a number.");
  fmt.Scan(&number)
  fmt.Printf("%dth iterative fibonacci is %d \n",number, iterativeFibb(number));
  fmt.Printf("%dth fibonacci is %d \n", number, fibonacci(number));
}
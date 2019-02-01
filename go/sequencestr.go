package main

import "fmt"
import "strings"

func stringComparator(c1 , c2 string) bool{
	defaultString :="abcdefghijklmnopqrstuvwxyz0123456789";
	i1 := strings.Index(defaultString, c1)
	i2 := strings.Index(defaultString, c2)
	return i1 <= i2
}

func main() {
	s1 := "inaaya"
	s2 := "yusuf"

	var temp string;
	temp = s1+s2
	fmt.Println(temp);
	fmt.Printf(" b before a , %t", stringComparator("b", "a"));
	i :=0
	j :=1
	sliceStr := make([]string, len(temp))

	for i, r := range temp {
		sliceStr[i] = string(r)
	}
 
	/// 1 4 2 5 5 1
	for{
		c1 := string(sliceStr[i])
		c2 := string(sliceStr[j])
		if(stringComparator(c1 , c2)){
			j++
		} else {
			sliceStr[i] = c2
			sliceStr[j] = c1
			i = 0
			j = 1
		}
		if(j >= len(sliceStr) -1){
			i++
			j = i+1
		}

		if(i >= len(sliceStr) -1){
			break;
		}
	}
	fmt.Println(sliceStr)
}
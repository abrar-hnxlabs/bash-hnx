package main

import "fmt"

type node struct {
	val int
	next *node
}

func add(head *node, val int){
	for{
		if(head.next != nil){
			head = head.next;
			continue
		}
		head.next = &node{val: val}
		break;
	}
}

func insertAt(head *node , index, val int){
	for i := 1 ; i <index ; i++ {
		if(head.next != nil){
			head = head.next
			continue
		}
	}

	var temp *node;
	if(head.next != nil){
		temp = head.next
	}

	head.next = &node{ val: val, next: temp}
}

func print(head *node){
	for{
		fmt.Printf("%d ", head.val);
		if(head.next != nil){
			head = head.next;
			continue
		}
		break
	}
	fmt.Printf("\n");
}
func main() {
	head := node{ val: 1}
	add(&head, 7)
	add(&head, 9)
	add(&head, 12)
	add(&head, 6)
	print(&head);

	insertAt(&head, 3, 77)
	insertAt(&head, 10, 701)
	print(&head);
}
package main;
import "fmt";

type node struct {
	val int
	left *node
	right *node
}

type btree interface {
	add(val int)
	remove(val int)
	find(val int)
	print()
}

func (root *node) add(val int) {
	if(root.val == 0) {
		root.val = val;
	} else {
		if(val <= root.val) {
			if(root.left == nil){
				root.left = &node{}
			}
			root.left.add(val)
		} else {
			if(root.right == nil){
				root.right = &node{}
			}
			root.right.add(val);
		}
	}
}

func (root *node) remove(val int) int {
	return 1
}

func (root *node) find(val int) *node {
	if(root.val == val){
		return root
	}

	if(val <= root.val && root.left != nil){
		return root.left.find(val);
	} else if(root.right != nil) {
		return root.right.find(val);
	}
	return nil
}

func(root *node) print() {
	if(root.left != nil){
		root.left.print();
	}
	fmt.Println(root.val);
	if(root.right != nil){
		root.right.print();
	}
}

func main() {
	fmt.Println("Running btree program.");
	root := node{};
	root.add(8);
	root.add(6);
	root.add(7);
	root.add(16);
	root.add(12);
	root.add(7);
	
	fmt.Println(root.find(8));
	root.print();
}
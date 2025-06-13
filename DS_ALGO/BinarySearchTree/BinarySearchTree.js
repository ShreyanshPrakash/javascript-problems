class BinarySearchTree {
  constructor() {
    this.root = null;

    this.totalNodes = 0;
  }

  addTreeNode(node) {
    if (this.root === null) {
      this.root = node;
      return;
    }

    let current = this.root;

    while (current) {
      if (node.value === current.value) {
        return undefined;
      }

      if (node.value < current.value) {
        if (current.left === null) {
          current.left = node;
          this.totalNodes++;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          this.totalNodes++;
          return;
        }
        current = current.right;
      }
    }
  }

  findNodeByValue(value) {
    if (this.root === null) {
      return null;
    }

    let current = this.root;

    while (current) {
      if (current.value === value) {
        return current;
      }

      if (value < current.value) {
        current = current.left;
        continue;
      }

      if (value > current.value) {
        current = current.right;
        continue;
      }
    }

    return null;
  }


  print(){

    let nodeList = [];

    if(this.root === null){
        return nodeList;
    }


    let current = this.root;

    while(current){
        
    }





  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/*
 */

const binarySearchTree = new BinarySearchTree();

binarySearchTree.addTreeNode(new TreeNode(1));
binarySearchTree.addTreeNode(new TreeNode(5));
binarySearchTree.addTreeNode(new TreeNode(0));
binarySearchTree.addTreeNode(new TreeNode(2));

// console.log(binarySearchTree.totalNodes);
// console.log(binarySearchTree.root);
console.log(binarySearchTree.findNodeByValue(5));

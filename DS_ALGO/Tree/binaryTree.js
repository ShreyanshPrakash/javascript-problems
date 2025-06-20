class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(node) {
    if (this.isEmpty()) {
      this.root = node;
      return;
    }

    this.#insertNode(node, this.root);
  }

  #insertNode(node, currentNode) {
    if (node.value < currentNode.value) {
      if (currentNode.left == null) {
        currentNode.left = node;
        return;
      }
      this.#insertNode(node, currentNode.left);
    } else {
      if (currentNode.right == null) {
        currentNode.right = node;
        return;
      }
      this.#insertNode(node, currentNode.right);
    }
  }

  // Naming of dfs
  // Postorder, Inorder or Preorder
  // its depends on when u r reading the data...
  // if u read the data POST traversing the left and right tree -> Postorder
  // if u read the data in between left and right travers -> in order...
  //    go left, then read the data, then go right
  // if u read the data first then traverse left and right tree -> Preorder
  dfs(node, list) {
    // this implementation is just a traversal
    if (!node) return;

    this.dfs(node.left, list);
    this.dfs(node.right, list);
    console.log(node.value, list);
    // after this, the call execution will return back to line no 38 or 39
    // or where the node.left was called...
    // also that line execution is complete...
    // so call execution will move to the next line...and call node.right
    // basically, go back to the last recursive method call...
    // then that call is poped out of stack
    // then move to the next code statement

    list.push(node.value);
    return list;
  }

  dfsSearch(node, target) {
    if (!node) return;

    if (node.value === target) {
      return node;
    }
    // Since this is binary tree
    // before calling the method, u can check if the target value is less or greated than node.value
    // based on that either call node.left or node.right
    let leftValue = this.dfs(node.left, target);
    // if the right value was found using node.left, then line 62 will return the node that matched
    // whatever it returns, that will be passed to leftValue variable
    // now we check if that has something...its not null
    // if true, then we return the leftValue which stores the node that matched
    // this will then not run the dfs for node.right in this iteration
    // whatever, is returned in the leftValue is then carried the same way recursively all the way to the top
    if (leftValue) {
      return leftValue;
    }
    // before calling the recursive function, u can check if node.left or right exist
    let rightValue = this.dfs(node.right, target);
    if (rightValue) {
      return rightValue;
    }
    // console.log(node.value, target);
    // after this, the call execution will return back to line no 38 or 39
    // or where the node.left was called...
    // also that line execution is complete...
    // so call execution will move to the next line...and call node.right
    // basically, go back to the last recursive method call...
    // then that call is poped out of stack
    // then move to the next code statement

    // this null is important so that it skips the if condition for right and leftvalue
    return null;
  }

  getLeastValueNode() {
    let iterateLeftTree = (node) => {
      if (node.left) {
        return iterateLeftTree(node.left);
      } else {
        return node; // whetevr i return from here, it will go to line no 64.
        // no in this case, I am not doing anything with that value like in the case of fibonacci, or factorial
        // here in line 64 (recursive call) i am again returning WIHTOUT ALTERING the return value from the recursive call
        // hence in this case, whatever u will return from the base condition will just get passed thorough
        // or , will get bubbled up to the first function call
        // ALSO, in this case I am returning somthing in both the cases.
        // if my base conditions meets or not....hence this is working
      }
    };

    const minNode = iterateLeftTree(this.root);
    return minNode;
  }

  getLargestvalueNode() {
    let iterateLeftTree = (node) => {
      if (node.right) {
        return iterateLeftTree(node.right);
      } else {
        return node; // whetevr i return from here, it will go to line no 64.
        // no in this case, I am not doing anything with that value like in the case of fibonacci, or factorial
        // here in line 64 (recursive call) i am again returning WIHTOUT ALTERING the return value from the recursive call
        // hence in this case, whatever u will return from the base condition will just get passed thorough
        // or , will get bubbled up to the first function call
        // ALSO, in this case I am returning somthing in both the cases.
        // if my base conditions meets or not....hence this is working
      }
    };

    const minNode = iterateLeftTree(this.root);
    return minNode;
  }

  deleteNodeByValue(value){
    
  }

  bfs(target) {
    if (this.isEmpty()) {
      return null;
    }

    let queue = [];
    queue.push(this.root);

    let search = (queue, target) => {
      if (queue.length === 0) {
        return null;
      }

      const queueNode = queue.shift();
      // console.log(queueNode.value);

      if (queueNode.value === target) {
        return queueNode;
      }

      if (queueNode.left) {
        queue.push(queueNode.left);
      }
      if (queueNode.right) {
        queue.push(queueNode.right);
      }

      return search(queue, target);
    };

    return search(queue, target);
  }

  searchNode(value) {
    let search = (node, value) => {
      if (!node) return;

      if (node.value === value) {
        return node;
      } else {
        if (value < node.value) {
          return search(node.left, value);
        } else {
          return search(node.right, value);
        }
      }
    };

    return search(this.root, value);
  }

  /*
    Utility Methods
  */

  isEmpty() {
    return this.root == null;
  }

  print() {
    let list = [];
    let result = this.dfs(this.root, list);
    return result;
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

let binaryTree = new BinaryTree();

binaryTree.insert(new TreeNode(10));
binaryTree.insert(new TreeNode(20));
binaryTree.insert(new TreeNode(5));
binaryTree.insert(new TreeNode(3));
binaryTree.insert(new TreeNode(2));
binaryTree.insert(new TreeNode(7));
binaryTree.insert(new TreeNode(-1));

// console.log(binaryTree.print());

// console.log(binaryTree.dfs(new TreeNode(5), []));
// console.log(binaryTree.dfs(binaryTree.root, 10));
// console.log(binaryTree.dfs(binaryTree.root, []));

// console.log(binaryTree.getLeastValueNode());
// console.log(binaryTree.getLargestvalueNode());

// console.log(binaryTree.searchNode(2));

// console.log(binaryTree.bfs(2));

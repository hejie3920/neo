class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}
class LinkNodeList {
  constructor() {
    this.head = null
    this.length = 0
  }
  append(element) {
    let node = new Node(element)
    let cur
    if (this.head === null) {
      this.head = node
    } else {
      cur = this.head

      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
      this.length += 1
    }
  }
  removeAt(index) {
    let cur = this.head
    let prev,
      i = 0
    if (index === 0) {
      this.head = cur.next
    } else {
      while (i < index) {
        // 上一个和当前都要保存
        prev = cur
        cur = cur.next
        i++
      }
      prev.next = cur.next
      // 这句是用来释放内存
      cur.next = null
    }
    this.length -= 1
    return cur.element
  }
  print() {
    let cur = this.head
    let res = []
    while (cur) {
      res.push(cur.element)
      cur = cur.next
    }
    console.log("TCL: ", res.join("==>"))
  }
}
let linkNode = new LinkNodeList()
linkNode.append("niha")
linkNode.append("23")
linkNode.append("666")
linkNode.print()
linkNode.removeAt(2)
linkNode.print()

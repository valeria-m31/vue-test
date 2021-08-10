export default function list_to_tree(list) {
  let map = {}
  let node
  let roots = []

  for (let i = 0; i < list.length; i++) {
    map[list[i].id] = i;
    list[i].children = [];
  }

  for (let i = 0; i < list.length; i++) {
    node = list[i];
    if (node.supervisor !== null && list[map[node.supervisor]]) {
      list[map[node.supervisor]].children.unshift(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}


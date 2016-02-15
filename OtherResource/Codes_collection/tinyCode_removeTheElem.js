function removeTheElem(elem) {
    elem.parentNode.removeChild(elem);
}
/*
 *删除节点要注意两点:
 *1、移除事件引用
 *2、移除节点引用
 *
 */

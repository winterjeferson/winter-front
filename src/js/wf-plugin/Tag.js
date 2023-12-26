export class Tag {
    close(target) {
        target.parentNode.parentNode.removeChild(target.parentNode);
    }
}
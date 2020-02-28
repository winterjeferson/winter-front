class Table {
    constructor() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        this.$table = document.querySelectorAll('.table');
    }

    build() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$table.length < 1) {
            return;
        }
        
        this.buildResponsive();
    }

    buildResponsive() {
        /*removeIf(production)*/ objDebug.debugMethod(this, objDebug.getMethodName()); /*endRemoveIf(production)*/
        Array.prototype.forEach.call(this.$table, function (item) {
            let wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            item.parentNode.insertBefore(wrapper, item);
            wrapper.appendChild(item);
        });
    }
}

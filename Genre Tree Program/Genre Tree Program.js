g = {}
gs = {}

class Genre {
    constructor(name, sheetname, parents, subgenres) {
        this.name = name;
        this.sheetname = sheetname;
        this.parents = parents;
        this.subgenres = subgenres;
    }
    
    back_main(mode) {
        mode = mode;
        let back_main_genres = this.sheetname;
        let back_main_list = [];
        
        for (let genre of this.parents) {
            if (!this.name.includes(genre.name) && !back_main_genres.includes(genre.name) && genre.name !== 'Top-level') {
                back_main_list.push(genre);
                back_main_genres += `; ${genre.sheetname}`;
            }
        }
        
        if (mode === 'obj') {
            return back_main_list;
        }
        
        if (mode === 'str' || mode === '') {
            return back_main_genres;
        }
    }
}


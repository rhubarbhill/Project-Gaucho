import csv

g = {}
    # This is the genre dictionary. It's intentionally just called "g" because it
    # will be called often while adding genres.
    # Testing

class Genre:
    def __init__ (self, name, sheetname, parents, subgenres):
        self.name = name
            # This should always be a string and will always be filled no matter what
        self.sheetname = sheetname
            # These are for genres where part of their name contains a genre name that
            # is not one of their parents. For example, "Ambient Pop" has the word "Ambient"
            # in it even though it does not have "Ambient" as a parent.
            # In such a case, Ambient Pop's sheetname would be "Amb*ent Pop" (see the rules
            # for name modification elsewhere). If there is no modification, then the sheetname
            # should be the exact same as the name

            # TODO: (!) You should have a function you use beforehand that detects the other genre
            # names that are contained within a genre’s name
        self.parents = parents
            # This should always be a list of nodes, NOT name strings
            # This is a list of a genre’s parent genres.
            # 
            # If it’s a top-level genre (usually meaning it has no parents), it should be inputted as
            # “[Top-level]” (again)
            #
            # If it's NOT a top-level genre, you do not need to put "Top-level" as a parent
            # 
            # TODO: (!) I don’t know how this will work yet, but you should also account for things
            # like Metal and EDM which are both top-level genres while still having a parent
            # (Metal has Rock and EDM has Electronic)
        self.subgenres = subgenres 
            # This should always be a list of nodes, NOT name strings
            # This is a list of a genre's child genres (a.k.a. "subgenres")

            # This INCLUDES the subgenres of its subgenres.
        pass
    
    def back_main(self, mode):
        # This should return a genre’s name along with all of its parents *who are not already*
        # textually contained within the genre’s name, with each genre separated by semicolons
            #These are what I call the “back main” genres
            #For instance, “C86” should return “C86; Indie Pop; Indie Rock; Alt Rock”
            #Before returning it, those four genres should’ve all been compiled in a list beforehand
        
        # Keep in mind that this function is just for finding the back main genres of a single genre.

        # TODO: (!) Define “front genres” some other time for documentation purposes but you
        # already know what they are

        # TODO: (!) Make a name type parameter to toggle whether it returns names or sheet names

        mode = mode
            # Whether it's an object or string
            # 'obj' or 'str' [default to 'str' if blank]

        back_main_genres = self.sheetname
            # This is the string which will eventually be returned.
        back_main_list = []

        for genre in self.parents:
            if genre.name not in self.name and genre.name not in back_main_genres and genre.name != 'Top-level':
                back_main_list.append(genre)
                    #This is so there's access to the objects themselves
                back_main_genres += f'; {genre.sheetname}'
        
        if mode == 'obj':
            return back_main_list
        if mode == 'str' or mode == '':
            return back_main_genres
    
    def back_all(self, mode, name, method):
        # This should return a genre’s name along with all of its parents, no matter what, with each
        # genre separated by semicolons

        if self.name == 'Top-level' or self.name is None:
            #Base case to stop recursion
            return

        mode = mode
            # Whether it's an object or string
            # 'obj' or 'str' [default to 'str' if blank]
        name = name
            # Whether it should return the name or the sheetname
            # 'name' or 'sheet' [default to 'sheet' if blank]
        method = method
            # Whether it does it by just returning the list of parents
                # 'par_list' [default if blank]
            # OR by going through each of the parents and doing back_all for each of them
                # 'comp_look' (stands for "comprehensive look")

        back_all_genres = self.sheetname
            # This is the string which will eventually be returned.     
        back_all_genres_n = self.name
        back_all_list = []

        if method == 'par_list' or method == '':
            for genre in self.parents:
                if genre.name != 'Top-level':
                    back_all_list.append(genre)
                    if mode == 'name':
                        back_all_genres += f'; {genre.name}'
                    if mode == 'sheet' or mode == '':
                        back_all_genres += f'; {genre.sheetname}'
        if method == 'comp_look':
            for genre in self.parents:
                back_all_genres += f'; {genre.back_all("str", "sheetname", "comp_look")}'
                back_all_genres_n += f'; {genre.back_all("str", "name", "comp_look")}'

        if mode == 'obj':
            g_list_str = back_all_genres_n.split('; ')
            for genre in g_list_str:
                genr = g[f'{genre}']
                if genr not in g_list_str:
                    back_all_list.append(genr)
            return back_all_list
        if mode == 'str' or mode == '':
            # TODO: (!) Fix the duplication issue ("Metal; Metal")
            # The below solution fixes it but it's a little clunky and strange
            # Possibly just a temporary fix

            back_all_genres = back_all_genres.replace('; None', '')
            b_a_g = back_all_genres.split('; ')
            b_a_g_nd = []
                #nd = no duplicates
            [b_a_g_nd.append(x) for x in b_a_g if x not in b_a_g_nd]

            back_all_genres = b_a_g_nd[0]
            for genre in b_a_g_nd[1:]:
                back_all_genres += f'; {genre}'

            return back_all_genres

        pass

    # TODO: (!) Make a function that returns the list of subgenres

    def __str__(self):
        parent_strings = []

        for genre in self.parents:
            parent_strings.append(genre.name)

        if self.name == self.sheetname:
            return f'{self.name} // Parents: {parent_strings}'
        else:
            return f'{self.name} (Sheet Name: {self.sheetname}) // Parents: {parent_strings}'

def add_genre(name, sheetname, parents):
    if sheetname.lower() == 'n/a':
        sheetname = name

    pare = []

    for gnr in parents:
        pare.append(g[f'{gnr}'])

    subgenres = []
    if f'{name}' not in g:
        genr = Genre(name, sheetname, pare, subgenres)
        #print('Debug: ', genr.name)
        g[f'{name}'] = genr

        if parents != '': #This function is to update the Genre's subgenre list
            for par in genr.parents:
                if genr not in par.subgenres:
                    par.subgenres.append(genr)
            
            # NOTE: Keep in mind that as of now, this ONLY updates the immediate parent
            # and does not update any grandparents.
            # I've decided this is a good arrangement for now.

    elif f'{name}' in g:
        # The purpose of this is to make it possible to add a genre again
        # but with new information. If I add a genre that's already been added but I have new
        # information in the "parents" field, then it will add that parent to the list rather
        # than replacing the genre entirely

        # Although it seems redundant, this will eventually coexist with a function that allows
        # you to add or change the parents of a genre. It may also be replaced by that, but
        # for now I'm doing this because the spreadsheet I'm importing from has a lot of
        # duplicate genres that I'd rather not sift through and having a method like this makes
        # it easier to deal with for now.

        #print('Debugging Note: Duplicate')

        genr = g[f'{name}']
        #print('Debug: ', genr.name)

        for gnr in pare:
            if gnr not in genr.parents:
                genr.parents.append(gnr)
        
        if parents != '': #This function is to update the Genre's subgenre list
            for par in genr.parents:
                if genr not in par.subgenres:
                    par.subgenres.append(genr)

        pass

def add_genre_check(name, sheetname, parents):
    # Checks a genre before adding it, returning all parents based on
    # only the immediate parents and looking through all existing genres
    # to see which ones are textually contained within it while also
    # not being a parent of it
    # This will not return anything, instead just printing (for now).

    # Eventually will use this example:
    # add_genre_check('Not Punk', 'Not Punk', ['Atmospheric Black Metal'])

    add_genre(name, sheetname, parents)

    if name == sheetname:
        print(f'Name of genre: {name}')
    else:
        print(f'Name of genre: {name} (Sheet Name: {sheetname})')
    
    genr = g[f'{name}']

    print('All parents of genre:', genr.back_all('', '', 'comp_look'))
    all_parents_o = genr.back_all('obj', '', 'comp_look')
    all_parents_s = []
    for genre in all_parents_o:
        all_parents_s.append(genre.name)

    print('Contained Genres:')
    for genre in g: #Checks the entire dictionary
        if g[genre].name in name and g[genre].name not in all_parents_s and g[genre].name != name:
            print(f'> {g[genre].name} contained in {name}')
        # TODO: (!) Make one for vice versa (if name is contained in genre name)
        
    print('')

    # TODO: (!) Review this again when I have more time

    pass

def csv_extract(filename): #Function to add genres from a csv file
    with open(filename, encoding='utf-8') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            par_gen = [] #To make the list of parent genres
            sheetname = 'n/a'
            if row[0] != row[1]: #If the sheet name (row[1]) is different from the regular name (row[0])
                sheetname = row[1] #Change the sheet name variable to the sheet name
            for gnr in range(2,12): #This is for the columns that have the parent genres
                if row[gnr] != '': #If it's not blank
                    par_gen.append(row[gnr]) #Append the genre to the par_gen list
            add_genre(row[0], sheetname, par_gen)

def print_all_genres():
    #Algorithm to print all genres along with their parents

    print(g['Top-level'].name)
    for subg in g['Top-level'].subgenres:
        print(subg.__str__())
        for subsubg in subg.subgenres:
            print('> ', subsubg.__str__())

    # TODO: (!) Currently, this does technically not print all genres, as it does not
    # print anything with a depth* greater than 2 (like "Flamenco nuevo", which is
    # a subgenre of a subgenre of a subgenre of a... you get the point.) You must
    # eventually make it able to print all genres, which may likely involve recursion.
    #
    # *depth = How deep it is in the genre tree. "Top-level" has a depth of 0,
    # genres like "Pop" and "Rock" have a depth of 1, and and subgenres like "Pop Rock"
    # has a depth of 2, etc.

def print_subgenres(genre):
    genrename = g[f'{genre}'].name
    print(genrename)
    print('')
    print(f'Subgenres of {genrename}:')
    for subgenre in g[f'{genre}'].subgenres:
        print(subgenre.__str__())
    
    # TODO: (!) This needs to be able to print not just the subgenres, but the subgenres
    # of the subgenres and so on. Will likely involve recursion.

def back_main_multiple(genre_list):
    # Enter a list of multiple genres, separated by "; ", and then it will return
    # that list of genres (with their sheet names) plus all of the parents of each one.

    # IMPORTANT: This function only works under the assumption that every
    # genre's list of parents includes ALL of their parents, not just immediate parents.

    g_list_str = genre_list.split('; ')
    g_list_obj = []
    back_main_genres = ''

    for genre in g_list_str:
        genr = g[f'{genre}']
        g_list_obj.append(genr)

    if len(g_list_str) == 1: #If only one genre is inputted
        back_main_genres = g_list_obj[0].back_main('str')
    elif len(g_list_str) > 1: #If more than one genre is inputted
        back_main_genres += g_list_obj[0].sheetname

        for genre in g_list_obj[1:]:
            back_main_genres += f'; {genre.sheetname}'

        for genre in g_list_obj:
            g_list_2 = genre.back_main('obj')

            for genr in g_list_2:
                if genr.sheetname not in back_main_genres and genre.sheetname != 'Top-level':
                    back_main_genres += f'; {genr.sheetname}'

    return back_main_genres

# TODO: (!) A function that checks a back_main_genres string to make sure
# that it's correct: all genres in the string need to exist and need to have
# the correct parents. Because back_main_genres strings use the sheetnames,
# there will have to be a list or dictionary with all of the sheetnames

def main():
    csv_extract('genres3.2.csv')

    ##Testing
    #print(g['Spirituals'].back_main('str'))
    #print(g['Spirituals'].back_main('obj'))
    #print('')
    #print(back_main_multiple('Chillwave; Jangle Pop; Country Rock'))
    #print(back_main_multiple('Digital Dancehall'))
    #print('')
    #print_subgenres('Caribbean Music')
    #print('')
    #print(g['Delta Blues'].back_all('', '', ''))
    #print(g['Delta Blues'].back_main(''))

    print(back_main_multiple('Pop Rap; West Coast Hip Hop; Conscious Hip Hop; Trap (Hip Hop)'))

    #add_genre_check('Not Punk', 'Not Punk', ['Atmospheric Black Metal'])
    #add_genre_check('Work Songs', 'Work Songs', ['Traditional Folk'])

if __name__ == "__main__":
    main()
    
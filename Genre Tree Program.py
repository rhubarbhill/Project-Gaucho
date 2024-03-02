import csv
import pickle

g = {}
    # This is the genre dictionary. It's intentionally just called "g" because it
    # will be called often while adding genres.
gs = {}
    # This is the genre sheet name dictionary. Any genres who have sheet names that
    # are different from the regular name will be placed here *in addition* to being
    # placed in the "g" dictionary. This allows the same object to be called and
    # updated with either the name as a key or the sheet name

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
        self.parents = parents
            # This should always be a list of nodes, NOT name strings
            # This is a list of a genre’s parent genres.
            # 
            # If it’s a top-level genre (usually meaning it has no parents), it should be inputted as
            # “[Top-level]” (again)
            #
            # If it's NOT a top-level genre, you do not need to put "Top-level" as a parent
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

        # TODO: Define “front genres” some other time for documentation purposes but you
        # already know what they are

        # TODO: Make a name type parameter to toggle whether it returns names or sheet names

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
        
        if mode == '':
            mode = 'str'
        else:
            mode = mode
            # Whether it's an object or string
            # 'obj' or 'str' [default to 'str' if blank]
        
        if name == '':
            name = 'name'
        else:
            name = name
            # Whether it should return the name or the sheetname
            # 'name' or 'sheet' [default to 'name' if blank]
        
        if method == '':
            method = 'par_list'
        else:
            method = method
            # Whether it does it by just returning the list of parents
                # 'par_list' [default if blank]
            # OR by going through each of the parents and doing back_all for each of them
                # 'comp_look' (stands for "comprehensive look")

        back_all_genres_n = self.name
            # This is the string which will eventually be returned.     
        back_all_genres_s = self.sheetname
        back_all_list = []

        if method == 'par_list':
            for genre in self.parents:
                if genre.name != 'Top-level':
                    back_all_list.append(genre)
                    if name == 'name':
                        back_all_genres_n += f'; {genre.name}'
                    if name == 'sheet':
                        back_all_genres_s += f'; {genre.sheetname}'
            if name == 'sheet':
                return back_all_genres_s
        if method == 'comp_look':
            for genre in self.parents:
                back_all_genres_n += f'; {genre.back_all("str", "name", "comp_look")}'

        if mode == 'obj':
            g_list_str = back_all_genres_n.split('; ')
            for genre in g_list_str:
                genr = g[f'{genre}']
                if genr not in g_list_str:
                    back_all_list.append(genr)
            return back_all_list
        if mode == 'str':
            # TODO: Fix the duplication issue ("Metal; Metal")
            # The below solution fixes it but it's a little clunky and strange
            # 6/7/2023: Now it's even more clunky and strange
            # Possibly just a temporary fix

            if name == 'name':
                back_all_genres_n = back_all_genres_n.replace('; None', '')
                b_a_g = back_all_genres_n.split('; ')
                b_a_g_nd = []
                    #nd = no duplicates
                [b_a_g_nd.append(x) for x in b_a_g if x not in b_a_g_nd]

                back_all_genres_n = b_a_g_nd[0]
                for genre in b_a_g_nd[1:]:
                    back_all_genres_n += f'; {genre}'

                return back_all_genres_n
            elif name == 'sheet' and method == 'comp_look':
                back_all_genres_n = back_all_genres_n.replace('; None', '')
                b_a_g = back_all_genres_n.split('; ')
                b_a_g_nd = []
                    #nd = no duplicates
                [b_a_g_nd.append(x) for x in b_a_g if x not in b_a_g_nd]

                back_all_genres_s = g[f'{b_a_g_nd[0]}'].sheetname
                for genre in b_a_g_nd[1:]:
                    genre_ = g[f'{genre}']
                    back_all_genres_s += f'; {genre_.sheetname}'
                return back_all_genres_s

    # TODO: Make a function that returns the list of subgenres

    def __str__(self):
        parent_strings = []

        for genre in self.parents:
            parent_strings.append(genre.name)

        if self.name == self.sheetname:
            return f'{self.name} // Parents: {parent_strings}'
        else:
            return f'{self.name} (Sheet Name: {self.sheetname}) // Parents: {parent_strings}'

def add_genre(name, sheetname, parents):
    if sheetname.lower() == 'n/a' or sheetname == '':
        sheetname = name
        # TODO: Make this simpler (make it so sheetname was already name to begin with if it
        # was already equal)

    pare = []

    for gnr in parents:
        pare.append(g[f'{gnr}'])

    subgenres = []
    if f'{name}' not in g:
        genr = Genre(name, sheetname, pare, subgenres)
        #print('Debug: ', genr.name)
        g[f'{name}'] = genr
        if name != sheetname:
            gs[f'{sheetname}'] = genr

        if parents != '': #This function is to update the Genre's subgenre list
            for par in genr.parents:
                if genr not in par.subgenres:
                    par.subgenres.append(genr)
            
            # NOTE: Keep in mind that as of now, this ONLY updates the immediate parent
            # and does not update any grandparents.
            # I've decided this is a good arrangement for now.
            # 6/7 NOTE: Actually, I'm not sure if the above statement is actually true

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
        if name != sheetname:
            gs[f'{sheetname}'] = genr
        #print('Debug: ', genr.name)

        for gnr in pare:
            if gnr not in genr.parents:
                genr.parents.append(gnr)
        
        if parents != '': #This function is to update the Genre's subgenre list
            for par in genr.parents:
                if genr not in par.subgenres:
                    par.subgenres.append(genr)

        pass

def add_genre_check(name, sheetname, parents, report_containments):
    # Checks a genre before adding it, returning all parents based on
    # only the immediate parents and looking through all existing genres
    # to see which ones are textually contained within it while also
    # not being a parent of it
    # This will not return anything, instead just printing (for now).

    # Eventually will use this example:
    # add_genre_check('Not Punk', 'Not Punk', ['Atmospheric Black Metal'])

    report = 'no'
    if report_containments == 'yes' or report_containments == '':
        report = 'yes'

    add_genre(name, sheetname, parents)
    
    genr = g[f'{name}']
    if name != sheetname:
        gs[f'{sheetname}'] = genr

    back_all_str = genr.back_all('str', 'name', 'comp_look')
    bas = back_all_str.split('; ')
    if len(bas) > 1:
        back_all_str = f'{bas[1]}'
        for i in bas[2:]:
            back_all_str += f'; {i}'
    elif len(bas) <= 1:
        back_all_str = ''
    # The above bas/if/elif stuff is because genr.back_all will always return the
    # name of the genre itself as the very first, so we need this in order to get
    # rid of it
    # TODO: Maybe find a better solution to this

    print(name, sheetname, back_all_str, sep='; ')

    if report == 'yes':
        all_parents_o = genr.back_all('obj', 'name', 'comp_look')
        all_parents_s = []
        for genre in all_parents_o:
            all_parents_s.append(genre.name)

        for genre in g: #Checks the entire dictionary
            if g[genre].name in name and g[genre].name not in all_parents_s and g[genre].name != name:
                print(f'>>> {g[genre].name} contained in {name}')
            if name in g[genre].name and g[genre].name not in all_parents_s and g[genre].name != name:
                print(f'>>> {name} contained in {g[genre].name}')
            
            # TODO: Make one for vice versa (if name is contained in genre name)
            # ^ Made but needs to check if right
        #print('')
        # 8/29/2023 Note: Took this extra print space out

        # TODO: Review this again when I have more time

    pass

def csv_extract(filename): #Function to add genres from a csv file
    # TODO: Make it so you can split semicolon lists, allowing for only two necessary cells
    # after the modified name
    with open(filename, encoding='utf-8') as file:
        csvreader = csv.reader(file)
        next(csvreader)
        for row in csvreader:
            par_gen = [] #To make the list of parent genres
            sheetname = 'n/a'
            if row[0] != row[1]: #If the sheet name (row[1]) is different from the regular name (row[0])
                sheetname = row[1] #Change the sheet name variable to the sheet name
            for gnr in range(2,12): #This is for the columns that have the parent genres
                if row[gnr] != '': #If it's not blank
                    par_gen.append(row[gnr]) #Append the genre to the par_gen list
            add_genre(row[0], sheetname, par_gen)

def csv_blood_check_for_2(filename):
    #checks a list of exactly two genres in a csv and sees if they have a
    #parent-child relationship

    with open(filename, encoding='utf-8') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            genre1 = g[f'{row[0]}']
            genre2 = g[f'{row[1]}']

            with open('readme.txt', 'a') as f:
                f.write(check_for_bloodline(genre1, genre2))
                f.write('\n')
    
    #This function can be phased out once it's been archived

def csv_blood_check_full(filename):
    #checks a list of genres in a csv and sees if they each have a
    #parent-child relationship with one another

    #More importantly: takes a list of genres and cuts it down to only
    #the genres who do not have children within the list
    #e.g. "Indie Rock; Alt Rock; Pop Rock" would be cut down to "Indie Rock; Pop Rock"
    #because "Indie Rock" is a subgenre of "Alt Rock", and all the other genres
    #do not have any other children within the list

        #TODO: This function may end up being renamed to purify_front or something

    #row must have two or more genres in it
    #row[0] (the first cell in each row) must contain a count of the number
    #of genres in the row

    #TODO: Make this out as its own function that can work on non-csv lists

    with open(filename, encoding='utf-8') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            back_list = []
            concat = ''
            concat_list = []
            row_len = int(row[0])
            for i in range(1, row_len+1):
                concat_list.append(row[i])
                for j in range(i, row_len+1):
                    if i != j:
                        row_i = row[i]
                        row_j = row[j]

                        if check_if_modified(row[i]) == False:
                            row_i = g[f'{row[i]}']
                        else:
                            row_i = gs[f'{row[i]}']
                        
                        if check_if_modified(row[j]) == False:
                            row_j = g[f'{row[j]}']
                        else:
                            row_j = gs[f'{row[j]}']

                        b_p = check_for_bloodline(row_i, row_j, 'back parents')
                        if b_p == '' or b_p in back_list:
                            pass
                        else:
                            back_list.append(b_p)
                    elif i == j:
                        pass

            concat_list_result = []
            i = -1
            for genre in concat_list:
                i += 1
                if genre not in back_list:
                    concat_list_result.append(concat_list[i])
            concat += concat_list_result[0]
            if len(concat_list_result) > 1:
                for genre in concat_list_result[1:]:
                    if genre != '':
                        concat += f'; {genre}'
            #print(concat)

            with open('sheetoutput.txt', 'a', encoding="utf-8") as f:
                f.write(concat)
                f.write('\n')

                #Initial System
                #f.write(back_parents) #Returns a list of the parent genres which should be deleted
                #f.write('\n')

def check_if_modified(genre):
    #Accepts a string containing one genre, returns whether or not it's been modified

    modified = False
    if '–' in genre or '0' in genre or '3' in genre or '@' in genre or '1' in genre:
        modified = True
    return modified

def check_for_bloodline(genre, other, mode):
    #checks two genres and sees if they have a
    #parent-child relationship
    
    if mode == '':
        mode = 'relation'
    else:
        mode = mode
        #'relation' (default) or 'back parents'

    relation = '> '
    back_parents = ''

    for parent in genre.parents:
        if parent == other:
            relation += f'(!) {genre.name} is a child of {other.name} [ #1 ch of #2 ]'
            back_parents += f'{other.name}'
    
    for parent in other.parents:
        if parent == genre:
            relation += f'(!) {other.name} is a child of {genre.name} [ #2 ch of #1 ]'
            back_parents += f'{genre.name}'
    
    if mode == 'relation':
        return relation
    if mode == 'back parents':
        return back_parents

def csv_extract_check(filename, report_containments):
    with open(filename, encoding='utf-8') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            par_gen = [] #To make the list of parent genres
            #sheetname = row[1]
            if row[0] != row[1]: #If the sheet name (row[1]) is different from the regular name (row[0])
                sheetname = row[1] #Change the sheet name variable to the sheet name
            for gnr in range(2,14): #This is for the columns that have the parent genres
                # NOTE: Max increased from 12 to 14 on Jun. 14
                if row[gnr] != '': #If it's not blank
                    par_gen.append(row[gnr]) #Append the genre to the par_gen list
            add_genre_check(row[0], row[1], par_gen, report_containments)

def print_all_genres():
    #Algorithm to print all genres along with their parents

    print(g['Top-level'].name)
    for subg in g['Top-level'].subgenres:
        print(subg.__str__())
        for subsubg in subg.subgenres:
            print('> ', subsubg.__str__())

    # TODO: Currently, this does technically not print all genres, as it does not
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
    
    # TODO: This needs to be able to print not just the subgenres, but the subgenres
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
        if check_if_modified(genre) == False:
            try:
                genr = g[f'{genre}']
            except KeyError:
                genr = g['No Genre']
        else:
            try:
                genr = gs[f'{genre}']
            except KeyError:
                genr = g['No Genre']
        g_list_obj.append(genr)
    
    # TODO: Make this work for sheet names as well (incorporate 'gs')

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

#TODO: Make a try/except for back_main_multiple

def csv_back_main_multi(filename):
    with open(filename, encoding='utf-8') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            string = back_main_multiple(str(row[0]))
            with open('sheetoutput.txt', 'a', encoding="utf-8") as f:
                f.write(string)
                f.write('\n')

# TODO: Figure out how to make with open() overwrite everything in sheetoutput.txt
# instead of just adding to it

# TODO: A function that checks a back_main_genres string to make sure
# that it's correct: all genres in the string need to exist and need to have
# the correct parents. Because back_main_genres strings use the sheetnames,
# there will have to be a list or dictionary with all of the sheetnames

def save_dict(dict):
    with open("genres.pickle", "wb") as f:
        pickle.dump(dict, f, protocol=pickle.HIGHEST_PROTOCOL)

def save_dict_2(dict):
    with open("genres_sheet.pickle", "wb") as f:
        pickle.dump(dict, f, protocol=pickle.HIGHEST_PROTOCOL)

def load_dict(dict):
    with open(dict, "rb") as f:
        return pickle.load(f)

g = load_dict("genres.pickle")
gs = load_dict("genres_sheet.pickle")

def print_testing():
    return "Hello from Python! (Testing)"

def main():
    back_main_input = input('Input a list of genres, separated by semicolons: ')
    print(back_main_multiple(str(back_main_input)))
    
    ##KEEP the below three comments for convenience
    #csv_extract('genres4.5.csv')
    #save_dict(g) #g is the main genre dictionary
    #save_dict_2(gs) #gs is the genre dictionary with all of the sheetnames
    ##KEEP the above three comments for convenience

    csv_back_main_multi("sheetinput.csv")

    #csv_blood_check_full('test1.csv')
    #csv_blood_check_full('sheet152.csv')
    #csv_blood_check_for_2('sheet151.csv')
    #csv_blood_check_for_2('sheet151.2.csv')

    #csv_extract_check('newgenrebatch.csv', '')

    ##Testing
    #print(g['Spirituals'].back_main('str'))
    #print(g['Spirituals'].back_main('obj'))
    #print('')
    #print(back_main_multiple('Chillwave; Jangle Pop; Country Rock'))
    #print(back_main_multiple('Digital Dancehall'))
    #print(back_main_multiple('UK Funky; Afrobeats; Dance-Pop'))
    #print('')
    #print_subgenres('Country')
    #print('')
    #print(g['Delta Blues'].back_all('str', 'name', 'comp_look'))
    #print(g['Nothing'].back_all('str', 'name', 'comp_look'))
        #^ Should not work
    #print(g['Jazz-Rock'].back_main(''))
    #print(g['Contemporary Country'].back_all('str', 'name', 'comp_look'))
    #print('Name (par list):', g['Delta Blues'].back_all('str', 'name', 'par_list'))
    #print('Sheet (par list):', g['Delta Blues'].back_all('str', 'sheet', 'par_list'))
    #print('Name (comp look):', g['Delta Blues'].back_all('str', 'name', 'comp_look'))
    #print('Sheet (comp look):', g['Delta Blues'].back_all('str', 'sheet', 'comp_look'))
    #print('')
    #print('Default Filled:', g['Delta Blues'].back_all('str', 'name', 'par_list'))
    #print('Default Blank:', g['Delta Blues'].back_all('', '', ''))

    #add_genre_check('New Rave', 'New Rave', ['Alt Dance', 'Indie Rock'])
    #add_genre_check('Work Songs', 'Work Songs', ['Traditional Folk'])

# TODO: Maybe make an "immediate parents" list that starts out empty and is filled as
# the genres are added like with "subgenres"
# TODO: Function to make a modified genre string into its non-modified version, and maybe vice versa if necessary

if __name__ == "__main__":
    main()

# TODO: Eventually clean up the code so it's not just functional but elegant as well
    # TODO: Consistency with single quotes and double quotes

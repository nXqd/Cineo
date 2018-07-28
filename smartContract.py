from boa.interop.Neo.Storage import GetContext, Put, Get
PRODUCT_HASH = 'bd65600d-8669-4903-8a14-af88203add38'

def Main(operation, args):
    if operation != None:
        if operation == 'UpdateMovieListHash':
            Put(GetContext(), PRODUCT_HASH, args[0])
            return True

        if operation == 'GetMovieListHash':
            return Get(GetContext(), PRODUCT_HASH)

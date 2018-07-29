from boa.interop.Neo.Storage import GetContext, Put, Get
BUYER_LIST_HASH = '9b8d4bd7-8f2d-426f-a232-e427a691df88'

def Main(operation, args):
    if operation != None:
        if operation == 'UpdateBuyerList':
            Put(GetContext(), BUYER_LIST_HASH, args[0])
            return True
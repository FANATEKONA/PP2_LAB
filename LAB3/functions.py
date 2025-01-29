def has_007(a):
    b = []
    for i in a:
        if i == 7 or i == 0:
            b.append(i)
    for i in range(len(b)-2):
        if b[i]==0 and b[i+1]==0 and b[i+2]==7:
            return True
    return False
    
def uni(a):
    res = [a[0]] 
    for i in a:
        ok = True
        for j in res:
            if i == j:
                ok = False
                break;
        if ok:
            res.append(i)
    return res;

#
# Creator (https://creatorsim.github.io/creator/)
#

.text

main:
    li   a0 23
    li   a1 -77
    li   a2 45
    jal  x1 sum
    jal  x1 sub
    li   a7 1
    ecall
    li   a7 10
    ecall

sum:
    add  t1 a0 a1
    add  t2 a2 a2
    add  a0 t1 zero
    add  a1 t2 zero
    jr   ra  

sub:
    sub a0 a0 a1
    jr ra


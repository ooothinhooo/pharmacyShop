PGDMP     -    1        
        |            pharmacy    15.4    15.4 5    9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            <           1262    16592    pharmacy    DATABASE     �   CREATE DATABASE pharmacy WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE pharmacy;
                postgres    false            �            1259    16634    accounts    TABLE     �   CREATE TABLE public.accounts (
    id integer NOT NULL,
    created_date date DEFAULT CURRENT_DATE,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    carts jsonb
);
    DROP TABLE public.accounts;
       public         heap    postgres    false            �            1259    16633    accounts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.accounts_id_seq;
       public          postgres    false    221            =           0    0    accounts_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;
          public          postgres    false    220            �            1259    16624 	   customers    TABLE       CREATE TABLE public.customers (
    id integer NOT NULL,
    namecus character varying(255) DEFAULT 'khach hang'::character varying NOT NULL,
    phone character varying(20),
    address text,
    gender character varying(10),
    email character varying(255),
    id_user integer
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    16623    customers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.customers_id_seq;
       public          postgres    false    219            >           0    0    customers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;
          public          postgres    false    218            �            1259    16679    id    SEQUENCE     k   CREATE SEQUENCE public.id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    DROP SEQUENCE public.id;
       public          postgres    false            �            1259    16610 	   medicines    TABLE     �  CREATE TABLE public.medicines (
    id integer DEFAULT nextval('public.id'::regclass) NOT NULL,
    name text,
    usage text,
    unit character varying(50),
    instructions text,
    dosage text,
    description text,
    packaging character varying(255),
    quantity text,
    effect text,
    image text,
    type_id integer,
    price numeric,
    sale numeric,
    createat date DEFAULT CURRENT_DATE,
    CONSTRAINT medicines_sale_check CHECK (((sale >= (0)::numeric) AND (sale <= (100)::numeric)))
);
    DROP TABLE public.medicines;
       public         heap    postgres    false    226            �            1259    16609    medicines_id_seq    SEQUENCE     �   CREATE SEQUENCE public.medicines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.medicines_id_seq;
       public          postgres    false    217            ?           0    0    medicines_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.medicines_id_seq OWNED BY public.medicines.id;
          public          postgres    false    216            �            1259    16603    medicinetypes    TABLE     h   CREATE TABLE public.medicinetypes (
    idtype integer NOT NULL,
    nametype character varying(255)
);
 !   DROP TABLE public.medicinetypes;
       public         heap    postgres    false            �            1259    16602    medicinetypes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.medicinetypes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.medicinetypes_id_seq;
       public          postgres    false    215            @           0    0    medicinetypes_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.medicinetypes_id_seq OWNED BY public.medicinetypes.idtype;
          public          postgres    false    214            �            1259    16644    orders    TABLE     �   CREATE TABLE public.orders (
    id integer NOT NULL,
    id_customer integer,
    order_date timestamp without time zone,
    total numeric(10,2),
    payment_method character varying(50),
    status bit(1)
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16663    orders_detail    TABLE     �   CREATE TABLE public.orders_detail (
    id integer NOT NULL,
    order_id integer,
    medicine_id integer,
    quantity integer,
    price numeric(10,2),
    total numeric(10,2)
);
 !   DROP TABLE public.orders_detail;
       public         heap    postgres    false            �            1259    16662    orders_detail_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.orders_detail_id_seq;
       public          postgres    false    225            A           0    0    orders_detail_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.orders_detail_id_seq OWNED BY public.orders_detail.id;
          public          postgres    false    224            �            1259    16643    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    223            B           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    222            �           2604    16637    accounts id    DEFAULT     j   ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);
 :   ALTER TABLE public.accounts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    16627    customers id    DEFAULT     l   ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);
 ;   ALTER TABLE public.customers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219                       2604    16606    medicinetypes idtype    DEFAULT     x   ALTER TABLE ONLY public.medicinetypes ALTER COLUMN idtype SET DEFAULT nextval('public.medicinetypes_id_seq'::regclass);
 C   ALTER TABLE public.medicinetypes ALTER COLUMN idtype DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    16647 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    16666    orders_detail id    DEFAULT     t   ALTER TABLE ONLY public.orders_detail ALTER COLUMN id SET DEFAULT nextval('public.orders_detail_id_seq'::regclass);
 ?   ALTER TABLE public.orders_detail ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            1          0    16634    accounts 
   TABLE DATA           O   COPY public.accounts (id, created_date, username, password, carts) FROM stdin;
    public          postgres    false    221   '=       /          0    16624 	   customers 
   TABLE DATA           X   COPY public.customers (id, namecus, phone, address, gender, email, id_user) FROM stdin;
    public          postgres    false    219   @       -          0    16610 	   medicines 
   TABLE DATA           �   COPY public.medicines (id, name, usage, unit, instructions, dosage, description, packaging, quantity, effect, image, type_id, price, sale, createat) FROM stdin;
    public          postgres    false    217   8@       +          0    16603    medicinetypes 
   TABLE DATA           9   COPY public.medicinetypes (idtype, nametype) FROM stdin;
    public          postgres    false    215   �Q       3          0    16644    orders 
   TABLE DATA           \   COPY public.orders (id, id_customer, order_date, total, payment_method, status) FROM stdin;
    public          postgres    false    223   TR       5          0    16663    orders_detail 
   TABLE DATA           Z   COPY public.orders_detail (id, order_id, medicine_id, quantity, price, total) FROM stdin;
    public          postgres    false    225   qR       C           0    0    accounts_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.accounts_id_seq', 6, true);
          public          postgres    false    220            D           0    0    customers_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.customers_id_seq', 2, true);
          public          postgres    false    218            E           0    0    id    SEQUENCE SET     1   SELECT pg_catalog.setval('public.id', 16, true);
          public          postgres    false    226            F           0    0    medicines_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.medicines_id_seq', 1, true);
          public          postgres    false    216            G           0    0    medicinetypes_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.medicinetypes_id_seq', 8, true);
          public          postgres    false    214            H           0    0    orders_detail_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.orders_detail_id_seq', 1, false);
          public          postgres    false    224            I           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 1, false);
          public          postgres    false    222            �           2606    16640    accounts accounts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.accounts DROP CONSTRAINT accounts_pkey;
       public            postgres    false    221            �           2606    16642    accounts accounts_username_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_username_key UNIQUE (username);
 H   ALTER TABLE ONLY public.accounts DROP CONSTRAINT accounts_username_key;
       public            postgres    false    221            �           2606    16632    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    219            �           2606    16617    medicines medicines_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.medicines
    ADD CONSTRAINT medicines_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.medicines DROP CONSTRAINT medicines_pkey;
       public            postgres    false    217            �           2606    16608     medicinetypes medicinetypes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.medicinetypes
    ADD CONSTRAINT medicinetypes_pkey PRIMARY KEY (idtype);
 J   ALTER TABLE ONLY public.medicinetypes DROP CONSTRAINT medicinetypes_pkey;
       public            postgres    false    215            �           2606    16668     orders_detail orders_detail_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.orders_detail
    ADD CONSTRAINT orders_detail_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.orders_detail DROP CONSTRAINT orders_detail_pkey;
       public            postgres    false    225            �           2606    16649    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    223            �           2606    16697    customers fk_customer_id_user    FK CONSTRAINT        ALTER TABLE ONLY public.customers
    ADD CONSTRAINT fk_customer_id_user FOREIGN KEY (id_user) REFERENCES public.accounts(id);
 G   ALTER TABLE ONLY public.customers DROP CONSTRAINT fk_customer_id_user;
       public          postgres    false    3216    221    219            �           2606    16618     medicines medicines_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.medicines
    ADD CONSTRAINT medicines_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.medicinetypes(idtype);
 J   ALTER TABLE ONLY public.medicines DROP CONSTRAINT medicines_type_id_fkey;
       public          postgres    false    217    215    3210            �           2606    16674 ,   orders_detail orders_detail_medicine_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders_detail
    ADD CONSTRAINT orders_detail_medicine_id_fkey FOREIGN KEY (medicine_id) REFERENCES public.medicines(id);
 V   ALTER TABLE ONLY public.orders_detail DROP CONSTRAINT orders_detail_medicine_id_fkey;
       public          postgres    false    217    225    3212            �           2606    16669 )   orders_detail orders_detail_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders_detail
    ADD CONSTRAINT orders_detail_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);
 S   ALTER TABLE ONLY public.orders_detail DROP CONSTRAINT orders_detail_order_id_fkey;
       public          postgres    false    225    223    3220            �           2606    16650    orders orders_id_customer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_id_customer_fkey FOREIGN KEY (id_customer) REFERENCES public.customers(id);
 H   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_id_customer_fkey;
       public          postgres    false    3214    223    219            1   �  x��ֱn�@��:�(u��όm� ����&�(�H�A�;���o*���l��dן��7���ܷy����C��u�n?�kw�nu�>��8�q��ǹ�v�{:ST�JS�*U%�t��Rv��oM�);e�씝�Sv�K�K�_C�K�K�K�K�K�K�=�rO����S�)��{�=��Hy�<R�x)��G�#��Ly�<S�)ϔ'�E�3��LyMyMyMyMyMyMy�KyMyMyKyKyKyKyKyKyKy�iNyKyOyOyOyOyOyOyOyOyJI�J�JKCK�K�KLCL�Lc���(�%�H��BY*�%.L��3���)x
��*�
�Z����
���*�
���*���ۋ�d�Y�V�l�[W�ըW$3�+�
�¯ ,�°@�Y�af�X@�eaY`�g�Yk��iaZ��k�Z��mmu�0݂��-�Ⴘ0.����ڪ{���ƹqn��ƹqn��V]����qn��ƹqn���ߺ����̨;�.ẅ��{�.b��ƹ��晁s��87΍s��87΍s��%��s��87΍s��87΍s�ZX��s��87΍s��87΍s�ڊ��s��87΍s��87΍s��z1�ƹqn��ƹqn���j�c΍s��87΍s��87ν��o��˨=��|��_o���O/?�}~}y|}xz���x.����\�υ���\�υ�\��΅���\�υ�\���΅��������vg��      /   $   x�3���HL�P�H�K��C S.#\Rf\1z\\\ ��      -      x��Z[o�V�~f~�y���m�H�Uy��ۮo�Jq��l6Mr�K��T�y�c��`01�`F��v�Y��"T��?��K�:�l��x��g��j�K�S_U}U�m�v�q`�G��G����w��?�,�tm6�b�F�7�~,���o~�M��]ʎ#W$��v6���ͦGx�ͦ��<q����l�^���f'����W(ωE��N~Hh��a""�{<�kwhjm�Kg����
�y�5r�)E�"r�G��!��咢˾R�b�`W�k���HD��QM}��}چ[c�"")��E��y��^Z׼$���Ķx�(y�����Z�3Z�~j'�nt�����5ۭ�^�� �����t�����Xѻo�N���Ϧ�؞ڮ��4�"�	�|��H�z�����^�Hؐ��� Ύ�p2��=c�I6���G��p�>��Z�)��$�:��0�:?��ǵ�)�����D�|������FB����{���� �~Lc���"�R/�M04��oM��}��#ҁ�w��J�+�s��e�x�
K������q�7���Z�Gum'��w���ݷH޳�gt�?�w� C��'d��ǌ>��V��k�)���ȕ��]�t���?3��C��:@~)8��z�>�y/׵� P��ڨ�\�E$��
�7���@�
b(>�Ygߤ��A�E/{�mv�G[uPȶ�8������硥��d��H�|-������x7���жg�g9�/q9�CG\���X���$��ƞ���s1JI9���l:�pL��fvi�䍤S��X�g���nKw�Պ�~�"P	9(�7},�.�:���OK����@���M
�����}�ck�I��M��5v���$3y`���0��n�n�Wd{�ӈ��!<s,�>�[���F�˶S� W��	��k�S�	����DJ������/F&��4����`�³Ƣ���­�SJ� �����Ht�?D29 �o��I��6�a��AvB���I+��oq�CY�6�̖1�0~@�Ռ��P�k��s��lM\�������O�R�AA���n��09�!���RZʚH��E��{d6��C42 ���E�}Q��Q�:��1�n��4ضL�۹h[M��*�s��!������CćF����7/v��e�;t|�/�|6��p3�g�,H@g�g6=�,\[]�m&!=>���+;W��`Bt�Bcńّ�{�Ҳ�������v�d!.��$q��O����f���Q������VD��V�XrK� w���g�b�C�x0���pB��m�:#O��$pĎ�$�L�=
IƉ��������Xi!�B~�������(���d6%=쐠�/�P��eɿ��#����S%���t���x�v��Jȑ�J[�(i�*�����7^nm��������[�w�Οv�.�Mٴ��n{�
l�x�j˲���~�7����n��Z���f�ʚ����$d�V�<d��9��"�x7�wEK�U۞[19����cIJ�cV�=����Z|,y*C^��͗L�<�M	�R�ء�T�I� �?�w�����ZYrCI�O���D˕�Ev�eG���\�*�'���C���6�t�e�N�U�Ռ��Z4ζ&�Q��g�~ҲǱ�5��~�J��o�?^��b�09a���i�Wr�;��g/lf{�N�G�9)�ҩ?̝&u�Q:�����8�`j�^��b#a�(�� ;�^�Vn���J?� h�)��\��G�bER��}��\���c:�è.�F�yJ6-�F�򞲝�K������[��s�
 ��c��" Ώ�Y?�.�+s��[2�Sa1'��6Qhy�CV������TS�JY9/���֠8�H~�JW�2r$殏F@�'uQD�uA9��~F�iN�OK x�a������Q,��c���Ya��#F�.��MǵF��Apc���f��[�l;�:[1
��N��Ĵq��0m`�-���-��,�!���p��4�^v�����MFe�!,`ר�V�G��Dl"za*���QT�5��x1��\~Pd�!1��E)�D1)��Ґ~p�QVS�k �� v�iA�$!R�c��-שX`�`,6�6�Z�<���� ���2X��N��|��������v���0t��hS��zW�u�G�q�c	Ԙ�$y��،�b�cou�M7�ū�_]�ceadXR�:%���Q͈�:y�2����R� ��yg���y3�T��F�Q3M5������U_r�}��l6������ �!"y� K)B6V����MI�8�
K�]��{�X� y�{����oW<m	�p}��	V��?3�"�(����A"P�9� �u�sI'l�+H�^v�$����s�h�ntB���{R*ްb0��}6k�� �=�V�����ї�s�)�zј��0aIy�`E�2�����f^}��Q�?�:y?qqj�Ĳ�]U[�dER�D��Si�i҂������rj��� J�h�\��5����sy�\Q�s�M'B�;f��nG�m!�\j,��WU�`ϝ�����ld>v���?�5�"2Pܙ~�6t�Ox@��RYNO��c-�����a��&�#2��3�q^��t���9�Zf�Ri\E�rǣ)Rq3�&|��P���۠��d�-��	eu^1�IC��@]62_���͹-��dO�@��)����6�1@n4�������هu|;���R��	�B[�ߡ쿎X�nt��]�Տlz;���q�a�ӪL���;���+�7g]��Ć���t�CY`�&�T5
���#�o+"�X�n#)�Cǵĥ8�!3�滞�N�N�&���#g��c�0�V\gU��5皛Q̽�U�\����\ =&Tͭ���{�Z�_q!uj(�ŅS��
x� �RMy
�.87�xs j`Xn0����ǖ������jk�+��_$�v���*���k��a�j'6�,������
	'�Nb<hj��Ż��k��La��]��=t�ȷKɆ���)I�NpՉ��0O�U
E	�WI%�ۄrڼ�rT[,|ٴ
q1zӎ��@�??�r�r��go���B��Oӑ��]�� ��H�NWF����T�<*���f~�uq�������&�> ��Q��ϋ1�U�:6�9`V�}���W��<k��	��\��F��{�쿉��h/�g]{�vH�!��a�CxN��w�	���h�a䀀ыK���Y��=�Jc":�eE0�(��t�qWS713^�|�Ł3���*9���ݻ>��#q%��G|y?Z6Հ׃������s��I}����>o���r�Vd�Xq�E�BO�d�Al�t[$���ZRxف�1�>��t��b�Ћ.w�x�Zţ7��}8�o�v<�!Ox�^���x�����0�|N��`W���	��x���ж5�h����O[3ֺ���������9h��*� -ڄ�K�:�����|+	U���;Ls!\��zL&�\h^��`v��^�x��;�1s)��eV2%��D�2���"%m�Y��q]Ս��o�}_�E)�%��*R^�됟�d/{e�C����.��;��4?3��҇^�Z~���&e�%D�ڲ�@m֫\l�%��"�k�;�N&毶Dͅ���Xi[�Ȏ^�Ʋ�Z�� ��/AN�ި��:U�
��?x�&��4̮��`������6��ܽ��'!��O �D�u�Q q�e�|Y�F�����ERͷ1T}������0�k*��G��U�~+ï���b�#d�#TI���?J�JIT��2]�
a>T����3��TD��I���
�&�u2��De�f�$1�	��WZ�(����M���ۍVK��ό�U,4��N~���Z�����b{�h�p�C�
�KI�#�C�Z�Я�N��KL���e�*^W�A�|Ɨ��1Y�z�H�v�?q��칬��.A�5{[����Pj�._�*���H�$�F�`h/P�]'\�ӫ��y"��=��0�J;����|�y�K��$��<����;��5& S  ������o��@���u3��c��2�U�/�VM6I�+��(��M'\�m���%#ہ$�#�~�l6����HS�g�C�O��ĩ"�iͦ5��^��ŷ+)�+&�N��)aA*��6�C"H&W�1��xQbz�X�2�v�-�24�o���F��n��+��j�m��������T��*���;W�x�����	7���+9'{�����P�6Uy�|�js��� ���*MV��56?�'2S*�Jr�Ų�<�������o�w�T
�����rɈI4J@1W�q_�@F�$w�peS8sMgB���_��v[��-uwܽ�c�����[�ϼ      +   �   x�M��1�u�)�	H�G�HT��Br	��� N����^x�}����|3M5~���$�L��FT�)f�1_j\�F��v���L���Qq��h���:2tՔ���p��r��z*��]8�0�0�Y#�eq!��{�Q@�>�4���]5� �fGU:      3      x������ � �      5      x������ � �     
create table
    users (
        id bigint primary key generated always as identity,
        email text unique not null,
        password text not null,
        role text check (role in ('teacher', 'student')) not null
    );

create table
    documents (
        id bigint primary key generated always as identity,
        title text not null,
        content text,
        download_link text not null,
        uploaded_by bigint references users (id) on delete cascade
    );

create table
    comments (
        id bigint primary key generated always as identity,
        document_id bigint references documents (id) on delete cascade,
        user_id bigint references users (id) on delete cascade,
        comment_text text not null,
        created_at timestamp
        with
            time zone default now ()
    );

create table
    likes (
        id bigint primary key generated always as identity,
        document_id bigint references documents (id) on delete cascade,
        user_id bigint references users (id) on delete cascade,
        created_at timestamp
        with
            time zone default now ()
    );

alter table users
add column full_name text not null;

alter table users alter column role
set
    not null;

create table
    tags (
        id bigint primary key generated always as identity,
        name text not null unique
    );

create table
    document_tags (
        document_id bigint references documents (id) on delete cascade,
        tag_id bigint references tags (id) on delete cascade,
        primary key (document_id, tag_id)
    );
